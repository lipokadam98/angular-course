import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient,private router: Router) {

  }

  signUp(email: string, password: string){
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAppIqmkubCS1JVutuArg-c0Cptx0OHcrM',{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),tap(resData=>{
      //Itt a lejárati dátumot állítjuk be a responseDataban megkapott expiresIn értéket alapul véve majd pedig 1000-el megszorozva
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    }))
  }

  signIn(email: string, password: string){
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAppIqmkubCS1JVutuArg-c0Cptx0OHcrM',{
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError),tap(resData=>{
      //Itt a lejárati dátumot állítjuk be a responseDataban megkapott expiresIn értéket alapul véve majd pedig 1000-el megszorozva
      this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
    }))
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['auth']);
  }

  private handleAuthentication(email: string,userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,userId,token,expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'An unknown error occured'
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }

    switch(errorRes.error.error.message){
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;
      case 'EMAIL_EXISTS':
          errorMessage = 'This email already exists'
        break;
    }

    return throwError(errorMessage);
  }
}
