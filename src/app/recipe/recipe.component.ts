import { Component, DestroyRef, inject } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [NgbRatingModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  recipe?: Recipe;
  private recipeService = inject(RecipeService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) =>
        (this.recipe = this.recipeService
          .allRecipes()
          .find((recipe) => recipe.id === paramMap.get('recipeId'))),
    });
    console.log(this.recipe);
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
