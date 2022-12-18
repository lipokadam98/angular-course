import { ShoppingListService } from './../shopping-list.service';
import { Component,ElementRef,Input,OnInit, ViewChild,Output,EventEmitter, OnDestroy } from "@angular/core";
import { Ingredient } from "src/app/shared/ingredient.model";
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit,OnDestroy {

  private ingredient: Ingredient;
  protected index: number;

  subscription: Subscription;
  @ViewChild('f',{static: false}) ngForm: NgForm;

  constructor(private shoppingListService: ShoppingListService){

  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.shoppingListItemChanged.subscribe((data: number) =>{
      this.ingredient = this.shoppingListService.getIngredients()[data];
      this.index = data;
      this.ngForm.setValue({
        name: this.ingredient.name,
        amount : this.ingredient.amount
      })
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm){
    const value = form.value;
    this.shoppingListService.addIngredient(new Ingredient(value.name,value.amount));
  }

  updateIngredient(form: NgForm){
    const value = form.value;
    this.shoppingListService.updateIngredient(new Ingredient(value.name,value.amount),this.index);
  }

  deleteIngredient(){
    this.shoppingListService.deleteIngredient(this.index);
    this.index = undefined;
    this.ngForm.reset();
  }
}
