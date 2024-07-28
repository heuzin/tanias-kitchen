import { Component, output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipeWasSelected = output<Recipe>();
  recipes: Recipe[] = [
    new Recipe(
      'Rosc',
      'Rosca deliciosa',
      'https://vonaoca.com.br/wp-content/uploads/2023/09/Rosca-de-Leite-Condensado.jpg.webp'
    ),
    new Recipe(
      'Rosca',
      'Rosca deliciosa',
      'https://vonaoca.com.br/wp-content/uploads/2023/09/Rosca-de-Leite-Condensado.jpg.webp'
    ),
  ];

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
