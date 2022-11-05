import { ShoppingListService } from './../shopping-list.service';
import { Component,ElementRef,Input,OnInit, ViewChild,Output,EventEmitter } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  @Input() ingredient;

  @ViewChild('nameInput',{static: false}) nameInput : ElementRef;

  @ViewChild('amountInput',{static: false}) amountInput : ElementRef;

  constructor(private shoppingListService: ShoppingListService){

  }

  ngOnInit(): void {

  }

  addIngredient(){
    this.shoppingListService.addIngredient(new Ingredient(this.nameInput.nativeElement.value,this.amountInput.nativeElement.value));
  }
}
