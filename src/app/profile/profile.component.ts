import { Component, computed, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private authService = inject(AuthService);

  currentUser = computed(() => this.authService.authenticated());

  form = computed(
    () =>
      new FormGroup({
        name: new FormControl(this.currentUser()?.email, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        email: new FormControl(this.currentUser()?.email, {
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      })
  );

  onSubmit() {
    const displayName = this.form().value.name;
    if (!displayName) return;

    this.authService
      .updateUser(
        this.currentUser()?.token!,
        displayName,
        'https://imgv3.fotor.com/images/cover-photo-image/AI-illustration-of-a-dragon-by-Fotor-AI-text-to-image-generator.jpg'
      )
      .subscribe(
        (resData) => {
          console.log(resData);
        },
        (errorMessage) => {
          console.log(errorMessage);
        }
      );
  }
}
