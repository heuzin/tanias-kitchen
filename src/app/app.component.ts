import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { RecipeService } from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    RecipesComponent,
    ShoppingCartComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ShoppingCartService, RecipeService],
})
export class AppComponent {
  title = 'tanias-kitchen';
}
