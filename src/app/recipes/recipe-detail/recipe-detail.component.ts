import { Component, inject, input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  recipe = input.required<Recipe>();

  recipeService = inject(RecipeService);

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe().ingredients);
  }
}
