import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';

@NgModule({
  declarations:[
    AuthComponent
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [RouterModule]
})
export class AuthModule{

}
