import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../../../recipes/recipe.service';

@Component({
  selector: 'app-product-list-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-list-edit.component.html',
  styleUrl: './product-list-edit.component.css',
})
export class ProductListEditComponent {
  form = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    imagePath: new FormControl('', {
      validators: [Validators.required],
    }),
    price: new FormControl(0, {
      validators: [Validators.required],
    }),
    countInStock: new FormControl(0, {
      validators: [Validators.required],
    }),
  });

  private recipeService = inject(RecipeService);

  onSubmit() {
    this.recipeService.addRecipe({
      id: '',
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
      imagePath: this.form.value.imagePath ?? '',
      price: this.form.value.price ?? 0,
      countInStock: this.form.value.countInStock ?? 0,
    });

    console.log(this.recipeService.allRecipes());
  }
}
