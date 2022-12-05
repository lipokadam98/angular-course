import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @ViewChild('subform',{static: false}) subForm?: NgForm;
  formObject={
    email: '',
    subscription: '',
    password: ''
  }
  title = 'template-driven-exercise';
  subscriptions = ['Basic','Advanced','Pro'];
  defaultSub = 'Advanced';


  saveForm(){
    console.log(this.subForm);
    this.formObject.email = this.subForm?.form.value.email;
    this.formObject.subscription = this.subForm?.form.value.subscription;
    this.formObject.password = this.subForm?.form.value.password;
  }
}
