import { signal } from '@angular/core';
import { CartItem } from './cart-item.model';

export class ShoppingCartService {
  private cartItems = signal<CartItem[]>([
    new CartItem(
      '1',
      'Rosca',
      'Rosca deliciosa',
      'https://vonaoca.com.br/wp-content/uploads/2023/09/Rosca-de-Leite-Condensado.jpg.webp',
      20,
      3
    ),
    new CartItem(
      '2',
      'Empadinha',
      'Empadinha deliciosa',
      'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/08/21/876346946-empadinhas.jpg',
      10,
      2
    ),
  ]);

  allCartItems = this.cartItems.asReadonly();
}
