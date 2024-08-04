import { catchError, tap } from 'rxjs';
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { CustomError } from '../shared/Error';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends CustomError {
  private user = signal<User | null>(null);
  private httpClient = inject(HttpClient);

  currentUser = this.user.asReadonly();

  getUserInfo(idToken: string) {
    return this.httpClient
      .post<{ users: User[] }>(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`,
        { idToken }
      )
      .pipe(
        catchError(this.handlError),
        tap((resData) => {
          const {
            localId,
            email,
            emailVerified,
            displayName,
            providerUserInfo,
            validSince,
            disabled,
            lastLoginAt,
            createdAt,
            customAuth,
            photoUrl,
          } = resData.users[0];
          const user = new User(
            localId,
            email,
            emailVerified,
            providerUserInfo,
            validSince,
            disabled,
            lastLoginAt,
            createdAt,
            customAuth,
            displayName,
            photoUrl
          );
          this.user.set(user);
        })
      );
  }

  updateUser(idToken: string, displayName: string, photoUrl: string) {
    return this.httpClient
      .post<User>(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`,
        {
          idToken,
          displayName,
          photoUrl,
          returnSecureToken: true,
        }
      )
      .pipe(catchError(this.handlError));
  }
}
