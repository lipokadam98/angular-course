import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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
  forbiddenUsernames = ['Chris','Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
      'username': new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
      'email': new FormControl('default@default.com',[Validators.required,Validators.email],this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    this.signupForm.valueChanges.subscribe(data =>{
      console.log(data);
    })

    this.signupForm.get('userData.username').valueChanges.subscribe(data=>{
      console.log(data);
    });

    this.signupForm.statusChanges.subscribe(data =>{
      console.log(data);
    })

    this.signupForm.get('userData').setValue({
      'username':'Max',
      'email':'max@test.com'
    });
    /*this.signupForm.setValue({
      'userData':{
        'username':'Max',
        'email':'max@test.com'
      },
      'gender': 'male',
      'hobbies': []
    });*/
    /*this.signupForm.patchValue({
      'userData':{
        'username':'Max',
        'email':'max@test2.com'
      }
    });*/
  }
  onAddHobby(){
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
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

  forbiddenNames(control: FormControl): {[s: string]:boolean}{
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      return {'nameIsForbidden':true};
    }
    return null;
  }


  forbiddenEmails(control: FormControl):Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true});
        }else{
          resolve(null);
        }
      },1500)
    })
    return promise;
  }


}
