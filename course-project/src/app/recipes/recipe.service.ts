import { ShoppingListService } from './../shopping-list/shopping-list.service';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe(
      "Pasta",
    "This is pasta",
    "https://www.foodandwine.com/thmb/89ZZD9UjFK0gl916arfCVwjJamc=/2000x1334/filters:fill(auto,1)/cream-tomato-rigatoni-FT-RECIPE1020-139fb3fa52574e8bb06f98e7fa3e4f1e.jpg",
    [new Ingredient('Pasta',1),
    new Ingredient('Sauce',2)]),
    new Recipe(
      "Big Fat Hamburger",
    "This is pasta2",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Hamburger_sandwich.jpg/250px-Hamburger_sandwich.jpg"
    , [new Ingredient('Buns',1),
    new Ingredient('Meat',1)]),
    new Recipe("Pizza","This is pasta3","https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Pizza_Margherita_stu_spivack.jpg/250px-Pizza_Margherita_stu_spivack.jpg",
    [new Ingredient('Pasta',1),
      new Ingredient('Salami',2)])
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(){
    //Javascript uses pass by reference as default
    //so we need to return a copy of the array
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
   /* ingredients.forEach( (ingredient: Ingredient)=>{
      this.shoppingListService.addIngredient(ingredient);
    });*/
    this.shoppingListService.addIngredients(ingredients);
    alert("Ingredients successfully added!");
  }
}
