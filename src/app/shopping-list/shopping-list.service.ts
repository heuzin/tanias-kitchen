import { signal } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  private ingredients = signal<Ingredient[]>([
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10),
  ]);

  allIngredients = this.ingredients.asReadonly();

  addIngredient(ingredient: Ingredient) {
    this.ingredients.update((prevIngredients) => [
      ...prevIngredients,
      ingredient,
    ]);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.update((prevIngredients) => [
      ...prevIngredients,
      ...ingredients,
    ]);
  }
}
