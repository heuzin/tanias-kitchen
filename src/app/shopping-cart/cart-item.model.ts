import { Recipe } from '../recipes/recipe.model';

export class CartItem extends Recipe {
  constructor(
    id: string,
    name: string,
    description: string,
    imagePath: string,
    price: number,
    public qty: number
  ) {
    super(id, name, description, imagePath, price);
  }
}
