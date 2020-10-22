import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { firebaseApiURL } from '../../config/config';

import * as AuthActions from '../store/auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
  email: string,
  userId: string,
  token: string,
  expiresIn: number
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
  return new AuthActions.AuthenticateSuccessed({
    email,
    userId,
    token,
    expirationDate: expirationDate
  });
};

const handleError = (errorResponse: any) => {
  let errorMessage = "An unknown error occured!";
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthenticateFailed(errorMessage));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'The email address is already in use by another account.';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'Email not found.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'The password is invalid.';
      break;
    case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled.';
      break;
  }
  return of(new AuthActions.AuthenticateFailed(errorMessage));
};

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_STARTED),
    switchMap((signupAction: AuthActions.SignupStarted) => {
      const body = {
        email: signupAction.payload.email,
        password: signupAction.payload.password,
        returnSecureToken: true,
      }
      return this.http.post<AuthResponseData>(
        firebaseApiURL +
        'v1/accounts:signUp?key=' +
        environment.firebaseApiKey, body)
        .pipe(
          map(resData => {
            return handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn);
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_STARTED),
    switchMap((authData: AuthActions.LoginStarted) => {
      const body = {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }
      return this.http.post<AuthResponseData>(
        firebaseApiURL +
        'v1/accounts:signInWithPassword?key=' +
        environment.firebaseApiKey, body)
        .pipe(
          map(resData => {
            handleAuthentication(
              resData.email,
              resData.localId,
              resData.idToken,
              +resData.expiresIn);
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESSED),
    tap(() => {
      this.router.navigate(['/']);
    })
  )

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
  ) { }
}
