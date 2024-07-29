import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

import { routes as recipeRoutes } from './recipes/recipe.routes';

export const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: recipeRoutes,
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
  },
];
