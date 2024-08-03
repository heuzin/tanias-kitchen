import { signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

export class ShoppingCartService {
  private cartItems = signal<CartItem[]>([]);

  allCartItems = this.cartItems.asReadonly();

  addToCart(item: CartItem) {
    this.cartItems.update((prevItems) => [...prevItems, item]);
  }

  removeItemFromCart(id: string) {
    this.cartItems.update((prevItems) =>
      prevItems.filter((item) => item.cartItemId !== id)
    );
  }
}
