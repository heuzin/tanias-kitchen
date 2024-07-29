import { Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { NoRecipeComponent } from './no-recipe/no-recipe.component';

export const routes: Routes = [
  {
    path: '',
    component: NoRecipeComponent,
  },
  {
    path: 'recipe/:recipeId',
    component: RecipeDetailComponent,
  },
];
