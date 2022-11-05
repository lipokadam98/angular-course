import { RecipeService } from './recipe.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  recipe: Recipe;

  constructor(private recipeService: RecipeService) {

   }

  ngOnInit(): void {
    this.recipeService.selectedRecipeEvent.subscribe(recipe=>{
      this.recipe = recipe;
    })
  }

}
