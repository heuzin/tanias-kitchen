import { Component, computed, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    LoadingSpinnerComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private loaderService = inject(LoaderService);
  error: string | null = null;

  loading = computed(() => this.loaderService.loading());

  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    if (!email || !password) return;

    this.loaderService.showLoader();
    this.authService.signup(email, password).subscribe(
      (resData) => {
        this.loaderService.hideLoader();
        this.router.navigate(['/']);
      },
      (errorMessage) => {
        this.error = errorMessage;

        this.loaderService.hideLoader();
      }
    );
  }
}
