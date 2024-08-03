import { Component, computed, DestroyRef, inject } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from '../../models/cart-item.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [NgbRatingModule, ReactiveFormsModule],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
})
export class RecipeComponent {
  recipe?: Recipe;
  selectedOption: FormControl = new FormControl<number>(1);

  private router = inject(Router);
  private recipeService = inject(RecipeService);
  private shoppingCartService = inject(ShoppingCartService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) =>
        (this.recipe = this.recipeService
          .allRecipes()
          .find((recipe) => recipe.id === paramMap.get('recipeId'))),
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  countInStock = computed(() =>
    Array.from(Array(this.recipe?.countInStock).keys())
  );

  addToCart(recipe: Recipe) {
    const cartItem: CartItem = {
      recipe,
      cartItemId: new Date().toISOString(),
      qty: this.selectedOption.value,
    };
    this.shoppingCartService.addToCart(cartItem);
    this.router.navigate(['cart']);
  }
}
