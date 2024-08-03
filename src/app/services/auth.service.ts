import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface AuthResponseData {
  idToken: string;
  email: string;
  displayName: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  tokenExpirationTimer: any;

  private user = signal<User | null>(null);
  private httpClient = inject(HttpClient);
  private route = inject(Router);

  currentUser = this.user.asReadonly();

  signup(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handlError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.displayName,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handlError),
        tap((resData) => {
          console.log(resData);
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.displayName,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData) return;

    const user: {
      email: string;
      id: string;
      displayName: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(userData);
    const loadedUser = new User(
      user.email,
      user.id,
      user.displayName,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (loadedUser.token) {
      const experationDuration =
        new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(experationDuration);
      this.user.set(loadedUser);
    }
  }

  logout() {
    localStorage.removeItem('userData');
    this.user.set(null);
    this.route.navigate(['login']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    displayName: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, displayName, token, expirationDate);
    this.user.set(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handlError(errorRes: HttpErrorResponse) {
    let errorMessage = errorRes.error.error.message;

    return throwError(() => new Error(errorMessage));
  }
}
