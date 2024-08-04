import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { UserFirestoreService } from '../../../services/user.firestore.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';
import { UserFirestore } from '../../../models/user.firestore.model';

@Component({
  selector: 'app-user-list-edit',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './user-list-edit.component.html',
  styleUrl: './user-list-edit.component.css',
})
export class UserListEditComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private userFirestoreService = inject(UserFirestoreService);
  loaderService = inject(LoaderService);

  loading = computed(() => this.loaderService.loading());
  user = signal<UserFirestore | null>(null);

  form = computed(
    () =>
      new FormGroup({
        isAdmin: new FormControl(this.user()?.isAdmin, {
          validators: [Validators.required],
        }),
      })
  );

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: async (paramMap) => {
        const user = await this.userFirestoreService.getUser(
          paramMap.get('userId')!
        );
        this.user.set(user);
        this.loaderService.hideLoader();
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  async onSubmit() {
    await this.userFirestoreService.updateUser({
      ...this.user()!,
      isAdmin: this.form().value.isAdmin || false,
    });

    this.router.navigate(['admin', 'users']);
  }
}
