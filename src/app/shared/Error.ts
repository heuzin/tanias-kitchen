import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

export class CustomError {
  protected handlError(errorRes: HttpErrorResponse) {
    const errorMessage = errorRes.error.error.message;

    return throwError(() => new Error(errorMessage));
  }
}
