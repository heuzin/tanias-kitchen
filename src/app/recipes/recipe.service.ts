import { inject, Injectable, signal } from '@angular/core';
import { Recipe } from './recipe.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Injectable()
export class RecipeService {
  private selectedRecipe = signal<Recipe | undefined>(undefined);
  private recipes = signal<Recipe[]>([
    new Recipe(
      '1',
      'Rosca',
      'Rosca deliciosa',
      'https://vonaoca.com.br/wp-content/uploads/2023/09/Rosca-de-Leite-Condensado.jpg.webp',
      20,
      5
    ),
    new Recipe(
      '2',
      'Empadinha',
      'Empadinha deliciosa',
      'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/08/21/876346946-empadinhas.jpg',
      10,
      1
    ),
    new Recipe(
      '3',
      'Biscoito',
      'Biscoito deliciosa',
      'https://s2-receitas.glbimg.com/YM2AqYqZtmoiR13lniLqs3LScR8=/0x0:1368x914/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/F/E/JaNupmT4awSoTWIEI4IA/biscoito-de-polvilho.jpg',
      10,
      2
    ),
  ]);

  allRecipes = this.recipes.asReadonly();
  recipeSelected = this.selectedRecipe.asReadonly();

  private shoppingCartService = inject(ShoppingCartService);

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe.set(recipe);
  }
}
