import { Component, computed, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { LoaderService } from '../../services/loader.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [DecimalPipe, LoadingSpinnerComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  private router = inject(Router);
  private recipeService = inject(RecipeService);
  loading = inject(LoaderService).loading;
  recipes = computed(() => this.recipeService.allRecipes());

  onClick() {
    const id = uuidv4();
    this.router.navigate(['admin', 'products', id, 'edit']);
  }

  async onDelete(recipeId: string) {
    await this.recipeService.deleteRecipe(recipeId);
  }

  onEdit(recipeId: string) {
    this.router.navigate(['admin', 'products', recipeId, 'edit']);
  }
}
