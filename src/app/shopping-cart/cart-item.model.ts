import { Recipe } from '../recipes/recipe.model';

export class CartItem extends Recipe {
  constructor(
    name: string,
    description: string,
    imagePath: string,
    price: number,
    public qty: number
  ) {
    super(name, description, imagePath, price);
  }
}
