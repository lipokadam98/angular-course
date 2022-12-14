import { Route, ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params=>{
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route});
    //this.router.navigate(['../',this.id,'edit'],{relativeTo: this.route});
  }

}
