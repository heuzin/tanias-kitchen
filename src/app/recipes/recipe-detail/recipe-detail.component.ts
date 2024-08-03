import { Component, DestroyRef, inject, input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  recipe?: Recipe;

  private recipeService = inject(RecipeService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParamMap.subscribe({
      next: (paramMap) => {
        return (this.recipe = this.recipeService
          .allRecipes()
          .find((recipe) => recipe.id === paramMap.get('recipeId')));
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onAddToShoppingList() {}
}
