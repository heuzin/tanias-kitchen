import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

export const routes: Routes = [
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UsersListComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'orders',
        component: OrdersListComponent,
      },
    ],
  },
];
