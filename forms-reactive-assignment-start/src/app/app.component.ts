import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  formGroup: FormGroup;

  projectStatuses = ['Stable', 'Critical', 'Finished'];

  public ngOnInit(): void {
    this.formGroup = new FormGroup({
      "projectName": new FormControl(null,[Validators.required],this.forbiddenProjectNameAsync),
      "email": new FormControl(null,[Validators.required,Validators.email]),
      "projectStatus": new FormControl(null)
    })
  }

  onSubmit(){
    console.log(this.formGroup.value);
  }

  forbiddenProjectName(control: FormControl): {[s: string]:boolean}{
    const value = control.value as string;
    if(value && value === 'Test'){
      return {'nameIsForbidden':true};
    }
    return null;
  }

  forbiddenProjectNameAsync(control: FormControl):Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value === 'Test'){
          resolve({'nameIsForbiddenAsync': true});
        }else{
          resolve(null);
        }
      },1500)
    })
    return promise;
  }


  formControlError(name: string,errortype: string){
    return this.formGroup.get(name).errors != null ? this.formGroup.get(name).errors[errortype]: false;
  }

}
