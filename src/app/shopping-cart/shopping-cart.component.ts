import { Component, computed, inject } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent {
  private shoppingCartService = inject(ShoppingCartService);
  cartItems = computed(() => this.shoppingCartService.allCartItems());

  totalItem = this.cartItems().reduce((acc, cur) => acc + cur.qty, 0);
  totalPrice = this.cartItems()
    .reduce((acc, cur) => acc + cur.qty * cur.price, 0)
    .toFixed(2);
}
