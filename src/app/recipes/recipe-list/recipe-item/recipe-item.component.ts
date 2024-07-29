import { Component, inject, input, output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  recipe = input.required<Recipe>();
  private recipeService = inject(RecipeService);

  onSelected(recipe: Recipe) {
    this.recipeService.selectRecipe(recipe);
  }
}
