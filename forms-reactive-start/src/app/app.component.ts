import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  currentUser: User;
  defaultUser: User = {
    username: "asdasdsa",
    email: "email@email.com",
    gender: "male"
  }
  signupForm: FormGroup;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
      'username': new FormControl(null,Validators.required),
      'email': new FormControl('default@default.com',[Validators.required,Validators.email]),
      }),
      'gender': new FormControl('male')
    });
  }

  onSubmit(){
    console.log(this.signupForm.valid);
    if(!this.signupForm.valid){
      alert("The form is not valid")
      return;
    }
    this.currentUser = this.signupForm.value;
    console.log("The current user: ",this.currentUser);
  }
}
