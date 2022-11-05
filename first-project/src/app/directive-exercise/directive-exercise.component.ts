import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directive-exercise',
  templateUrl: './directive-exercise.component.html',
  styleUrls: ['./directive-exercise.component.css']
})
export class DirectiveExerciseComponent implements OnInit {
  paraHidden: boolean = false;
  buttonclickLogs = [];
  constructor() { }

  ngOnInit(): void {
  }

  togglePara(){
    this.paraHidden = !this.paraHidden;
    this.buttonclickLogs.push(new Date());
  }
}
