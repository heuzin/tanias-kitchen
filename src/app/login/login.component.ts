import { Component, computed, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { AuthService } from '../services/auth.service';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  error: string | null = null;

  private router = inject(Router);
  private authService = inject(AuthService);
  private loaderService = inject(LoaderService);

  loading = computed(() => this.loaderService.loading());

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    if (!email || !password) return;

    this.loaderService.showLoader();
    this.authService.login(email, password).subscribe(
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
