import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';

export const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
  },
  {
    path: 'recipe/:recipeId',
    component: RecipeComponent,
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
  },
];
