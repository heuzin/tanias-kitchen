import { FormsModule } from '@angular/forms';

import { Component, ElementRef, output, viewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  nameInputRef = viewChild.required<ElementRef>('nameInput');
  amountInputRef = viewChild.required<ElementRef>('amountInput');
  ingredientAdded = output<Ingredient>();

  onAddItem() {
    const ingredientName = this.nameInputRef().nativeElement.value;
    const ingredientAmount = this.amountInputRef().nativeElement.value;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    this.ingredientAdded.emit(newIngredient);
  }
}
