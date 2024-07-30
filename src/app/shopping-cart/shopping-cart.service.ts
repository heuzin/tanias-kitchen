import { signal } from '@angular/core';
import { CartItem } from './cart-item.model';

export class ShoppingCartService {
  private cartItems = signal<CartItem[]>([
    {
      recipe: {
        id: '1',
        name: 'Rosca',
        description: 'Rosca deliciosa',
        imagePath:
          'https://vonaoca.com.br/wp-content/uploads/2023/09/Rosca-de-Leite-Condensado.jpg.webp',
        price: 20,
        countInStock: 3,
      },
      cartItemId: '10',
      qty: 2,
    },
    {
      recipe: {
        id: '2',
        name: 'Empadinha',
        description: 'Empadinha deliciosa',
        imagePath:
          'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/08/21/876346946-empadinhas.jpg',
        price: 10,
        countInStock: 2,
      },
      cartItemId: '20',
      qty: 1,
    },
  ]);

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
