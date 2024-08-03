import { Component, inject } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeService } from '../../services/recipe.service';
import { LoaderService } from '../../services/loader.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [RecipeItemComponent, LoadingSpinnerComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  recipes = inject(RecipeService).allRecipes;
  loading = inject(LoaderService).loading;
}
