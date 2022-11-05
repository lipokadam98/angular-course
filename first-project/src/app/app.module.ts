import { ServerComponent } from './server/server.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ServersComponent } from './servers/servers.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { DirectiveExerciseComponent } from './directive-exercise/directive-exercise.component';

@NgModule({
  declarations: [
    ServerComponent,
    AppComponent,
    ServersComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    DirectiveExerciseComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
