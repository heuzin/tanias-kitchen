import { Component, computed, DestroyRef, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../services/loader.service';
import { LoadingSpinnerComponent } from '../../../shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-product-list-edit',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinnerComponent],
  templateUrl: './product-list-edit.component.html',
  styleUrl: './product-list-edit.component.css',
})
export class ProductListEditComponent {
  productId = '';

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private recipeService = inject(RecipeService);
  loading = inject(LoaderService).loading;

  recipe = computed(() =>
    this.recipeService
      .allRecipes()
      .find((recipe) => recipe.id === this.productId)
  );
  form = computed(
    () =>
      new FormGroup({
        name: new FormControl(this.recipe()?.name, {
          validators: [Validators.required, Validators.minLength(3)],
        }),
        description: new FormControl(this.recipe()?.description, {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        imagePath: new FormControl(this.recipe()?.imagePath, {
          validators: [Validators.required],
        }),
        price: new FormControl(this.recipe()?.price, {
          validators: [Validators.required],
        }),
        countInStock: new FormControl(this.recipe()?.countInStock, {
          validators: [Validators.required],
        }),
      })
  );
  updateRecipe = computed(() => (this.recipe() ? true : false));

  ngOnInit(): void {
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.productId = paramMap.get('productId')!;
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  async onSubmit() {
    if (this.updateRecipe()) {
      await this.recipeService.updateRecipe({
        id: this.productId,
        name: this.form().value.name ?? '',
        description: this.form().value.description ?? '',
        imagePath: this.form().value.imagePath ?? '',
        price: this.form().value.price ?? 0,
        countInStock: this.form().value.countInStock ?? 0,
      });
    } else {
      await this.recipeService.addRecipe({
        id: this.productId,
        name: this.form().value.name ?? '',
        description: this.form().value.description ?? '',
        imagePath: this.form().value.imagePath ?? '',
        price: this.form().value.price ?? 0,
        countInStock: this.form().value.countInStock ?? 0,
      });
    }

    this.router.navigate(['admin', 'products']);
  }
}
