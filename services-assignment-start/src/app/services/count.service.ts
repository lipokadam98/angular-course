import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  interactions: number = 0;
  constructor() { }

  addInteraction(){
    this.interactions++;
    console.log('Interactions: ',this.interactions);
  }
}
