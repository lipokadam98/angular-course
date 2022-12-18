import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.css'],
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit{

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  authForm: FormGroup;

  constructor(private authService: AuthService,private router: Router){

  }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6)])
    })
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(){



    if(!this.authForm.valid){
      return;
    }

    let email = this.authForm.get('email').value;
    let password = this.authForm.get('password').value;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.signIn(email,password);
    }else{
      authObs = this.authService.signUp(email,password);
    }

    authObs.subscribe(data=>{
      console.log(data);

      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },(error)=>{
      this.error = error;
      this.isLoading = false;
    });

    this.authForm.reset();
  }
}
