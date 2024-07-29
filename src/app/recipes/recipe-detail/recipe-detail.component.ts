import { Component, DestroyRef, inject, input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  recipe?: Recipe;

  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  private recipeService = inject(RecipeService);

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) =>
        (this.recipe = this.recipeService
          .allRecipes()
          .find((recipe) => recipe.id === paramMap.get('recipeId'))),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onAddToShoppingList() {}
}
