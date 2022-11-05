import { Ingredient } from 'src/app/shared/ingredient.model';
import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class ShoppingListService {

  @Output() ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients :Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',10)
  ];
  constructor() {

  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients);
  }

  addIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.ingredients);
  }

  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }
}
