import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  recipeflag: boolean = true;

  onNavigate(event: string) {
    switch (event) {
      case 'recipe':
        this.recipeflag = true;
        break;
      case 'shopping-list':
        this.recipeflag = false;
        break;
    }
  }
}
