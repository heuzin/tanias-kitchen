import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    RecipesComponent,
    ShoppingListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ShoppingListService],
})
export class AppComponent {
  title = 'tanias-kitchen';
  loadedFeature: 'recipe' | 'shopping-list' = 'recipe';

  onNavigate(feature: 'recipe' | 'shopping-list') {
    this.loadedFeature = feature;
  }
}
