import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, Subject } from "rxjs";
import { apiURL, firebaseApiURL } from "../config/config";

import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  user = new Subject<User>();

  constructor(
    private http: HttpClient
  ) { }

  signUp(email: string, password: string) {
    const body = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    return this.http.post<AuthResponseData>(firebaseApiURL + 'v1/accounts:signUp?key=AIzaSyCTpFZH6J2GXfuyn4G-A0kLSm4nMnzwlRA', body)
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }


  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    }
    return this.http.post<AuthResponseData>(firebaseApiURL + 'v1/accounts:signInWithPassword?key=AIzaSyCTpFZH6J2GXfuyn4G-A0kLSm4nMnzwlRA', body)
      .pipe(catchError(this.handleError));
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error occured!";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
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
    return throwError(errorMessage);
  }

}
