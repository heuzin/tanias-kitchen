import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RecipeComponent } from './recipes/recipe/recipe.component';
import { AdminComponent } from './admin/admin.component';

import { routes as adminRoutes } from './admin/admin.routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoggedinGuard } from './guards/loggedin.guard';

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
  {
    path: 'admin',
    component: AdminComponent,
    children: adminRoutes,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedinGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedinGuard],
  },
];
