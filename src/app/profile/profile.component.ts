import { Component, computed, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { LoaderService } from '../services/loader.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { ErrorMessageComponent } from '../shared/error-message/error-message.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    DatePipe,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private userService = inject(UserService);
  private loaderService = inject(LoaderService);
  private authToken = inject(AuthService).authenticated()?.token;

  error: string | null = null;
  loading = computed(() => this.loaderService.loading());
  currentUser = computed(() => this.userService.currentUser());

  form = computed(
    () =>
      new FormGroup({
        name: new FormControl(this.currentUser()?.displayName, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        photoUrl: new FormControl(this.currentUser()?.photoUrl, {
          validators: [Validators.required, Validators.email],
        }),
      })
  );

  onSubmit() {
    const displayName = this.form().value.name;
    const photoUrl = this.form().value.photoUrl;
    if (!displayName || !photoUrl || !this.authToken) return;

    this.loaderService.showLoader();
    this.userService
      .updateProfile(this.authToken, displayName, photoUrl)
      .subscribe(
        (resData) => {
          console.log(resData);
          this.loaderService.hideLoader();
        },
        (errorMessage) => {
          this.error = errorMessage;
          this.loaderService.hideLoader();
        }
      );
  }
}
