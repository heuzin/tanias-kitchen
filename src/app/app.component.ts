import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RecipeService } from './services/recipe.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';

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
export class AppComponent implements OnInit {
  title = 'tanias-kitchen';

  private authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
