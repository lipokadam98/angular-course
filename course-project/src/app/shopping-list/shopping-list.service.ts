import { Ingredient } from 'src/app/shared/ingredient.model';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredient[]>();
  shoppingListItemChanged = new Subject<number>();

  private ingredients :Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10)
  ];
  constructor() {

  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients);
  }

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  updateIngredient(ingredient: Ingredient,index: number){
    this.ingredients[index].amount = ingredient.amount;
    this.ingredients[index].name = ingredient.name;
    console.log(this.ingredients[index]);
    this.ingredientsChanged.next(this.ingredients);
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients);
  }
}
