import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
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
export class AuthService implements OnInit{

  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient,private router: Router) {

  }

  ngOnInit(): void {
    this.autoLogin();
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

  autoLogin(){
   const userData: {
    email: string,
    id: string,
    _token: string,
    _tokenExpirationDate: string

   } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }

    const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));

    if(loadedUser.token){
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }


  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['auth']);

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    },expirationDuration);
  }

  private handleAuthentication(email: string,userId: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,userId,token,expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData',JSON.stringify(user));
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
