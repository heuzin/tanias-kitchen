import { inject, Injectable, signal } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { LoaderService } from './loader.service';

@Injectable()
export class RecipeService {
  private firestore = inject(Firestore);
  private loaderService = inject(LoaderService);
  recipesCollection = collection(
    this.firestore,
    'recipes'
  ) as CollectionReference<Recipe>;

  private selectedRecipe = signal<Recipe | undefined>(undefined);
  private recipes = signal<Recipe[]>([]);

  allRecipes = this.recipes.asReadonly();
  recipeSelected = this.selectedRecipe.asReadonly();

  constructor() {
    this.fetchRecipes();
  }

  async fetchRecipes() {
    this.loaderService.showLoader();
    const snapshot = await getDocs(this.recipesCollection);
    this.recipes.set([...snapshot.docs.map((document) => document.data())]);
    this.loaderService.hideLoader();
  }

  selectRecipe(recipe: Recipe) {
    this.selectedRecipe.set(recipe);
  }

  async addRecipe(recipe: Recipe) {
    this.loaderService.showLoader();
    const ref = doc(this.firestore, 'recipes', recipe.id);
    await setDoc(ref, recipe);
    await this.fetchRecipes();
  }

  async updateRecipe(recipe: Recipe) {
    this.loaderService.showLoader();
    const ref = doc(this.firestore, 'recipes', recipe.id);
    await updateDoc(ref, {
      ...recipe,
    });
    await this.fetchRecipes();
  }

  async deleteRecipe(id: string) {
    this.loaderService.showLoader();
    const ref = doc(this.firestore, 'recipes', id);
    await deleteDoc(ref);
    await this.fetchRecipes();
  }
}
