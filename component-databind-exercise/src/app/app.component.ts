import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'component-databind-exercise';

  emittednumbers: number[] = [];

  emittedNumbers(number: number): void {
    this.emittednumbers.push(number);
  }

  isEven(num: number): number {
    return num % 2;
  }
}
