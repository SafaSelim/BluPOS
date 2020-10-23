import { Action } from '@ngrx/store';

export const LOGIN_STARTED = '[Auth] Login Started';
export const AUTHENTICATE_SUCCESSED = '[Auth] Authenticate Successed';
export const AUTHENTICATE_FAILED = '[Auth] Login Authenticate Failed';
export const SIGNUP_STARTED = '[Auth] Signup Started';
export const ERROR_CLEARED = '[Auth] Error Cleared';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const LOGOUT = '[Auth] Logout';


export class AuthenticateSuccessed implements Action {
  readonly type = AUTHENTICATE_SUCCESSED;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
    }) { };
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStarted implements Action {
  readonly type = LOGIN_STARTED;

  constructor(public payload: { email: string; password: string }) { }
}

export class AuthenticateFailed implements Action {
  readonly type = AUTHENTICATE_FAILED;

  constructor(public payload: string) { }
}

export class SignupStarted implements Action {
  readonly type = SIGNUP_STARTED;

  constructor(public payload: { email: string, password: string }) { }
}

export class ErrorCleared implements Action {
  readonly type = ERROR_CLEARED;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export type AuthActions =
  | AuthenticateSuccessed
  | Logout
  | LoginStarted
  | AuthenticateFailed
  | SignupStarted
  | ErrorCleared
  | AutoLogin;
