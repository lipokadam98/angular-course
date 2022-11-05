import { RecipeService } from './../recipe.service';
import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  selectedRecipe: Recipe;
  recipes: Recipe[];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.selectedRecipeEvent.subscribe(recipe=>{
      this.selectedRecipe = recipe;
    });
  }

  onSelectRecipe(event){
    this.selectedRecipe = event;
  }

}
