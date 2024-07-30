import { inject, Injectable, signal } from '@angular/core';
import { Recipe } from './recipe.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable()
export class RecipeService {
  private selectedRecipe = signal<Recipe | undefined>(undefined);
  private recipes = signal<Recipe[]>([
    {
      id: '1',
      name: 'Rosca',
      description: 'Rosca deliciosa',
      imagePath:
        'https://vonaoca.com.br/wp-content/uploads/2023/09/Rosca-de-Leite-Condensado.jpg.webp',
      price: 20,
      countInStock: 5,
    },
    {
      id: '2',
      name: 'Empadinha',
      description: 'Empadinha deliciosa',
      imagePath:
        'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/08/21/876346946-empadinhas.jpg',
      price: 10,
      countInStock: 0,
    },
    {
      id: '3',
      name: 'Biscoito',
      description: 'Biscoito deliciosa',
      imagePath:
        'https://s2-receitas.glbimg.com/YM2AqYqZtmoiR13lniLqs3LScR8=/0x0:1368x914/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/F/E/JaNupmT4awSoTWIEI4IA/biscoito-de-polvilho.jpg',
      price: 10,
      countInStock: 2,
    },
  ]);

  allRecipes = this.recipes.asReadonly();
  recipeSelected = this.selectedRecipe.asReadonly();

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe.set(recipe);
  }
}
