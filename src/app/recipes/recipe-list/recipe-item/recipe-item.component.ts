import { Component, input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  recipe = input.required<Recipe>();
}
