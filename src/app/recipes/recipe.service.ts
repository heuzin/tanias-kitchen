import { inject, Injectable, signal } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private selectedRecipe = signal<Recipe | undefined>(undefined);
  private recipes = signal<Recipe[]>([
    new Recipe(
      'Rosca',
      'Rosca deliciosa',
      'https://vonaoca.com.br/wp-content/uploads/2023/09/Rosca-de-Leite-Condensado.jpg.webp',
      [new Ingredient('Bread', 1), new Ingredient('Sugar', 1)]
    ),
    new Recipe(
      'Empadinha',
      'Empadinha deliciosa',
      'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/08/21/876346946-empadinhas.jpg',
      [new Ingredient('Bread', 1), new Ingredient('Chicken', 2)]
    ),
    new Recipe(
      'Biscoito',
      'Biscoito deliciosa',
      'https://s2-receitas.glbimg.com/YM2AqYqZtmoiR13lniLqs3LScR8=/0x0:1368x914/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/F/E/JaNupmT4awSoTWIEI4IA/biscoito-de-polvilho.jpg',
      []
    ),
  ]);

  allRecipes = this.recipes.asReadonly();
  recipeSelected = this.selectedRecipe.asReadonly();

  private shoppingListService = inject(ShoppingListService);

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe.set(recipe);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
