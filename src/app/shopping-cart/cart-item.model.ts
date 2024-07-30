import { Recipe } from '../recipes/recipe.model';

export interface CartItem {
  recipe: Recipe;
  cartItemId: string;
  qty: number;
}
