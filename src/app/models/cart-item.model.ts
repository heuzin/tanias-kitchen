import { Recipe } from './recipe.model';

export interface CartItem {
  recipe: Recipe;
  cartItemId: string;
  qty: number;
}
