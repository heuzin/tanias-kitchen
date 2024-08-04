import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { ProductListEditComponent } from './products-list/product-list-edit/product-list-edit.component';
import { UserListEditComponent } from './users-list/user-list-edit/user-list-edit.component';

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
        path: 'users/:userId',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users/:userId/edit',
        component: UserListEditComponent,
      },
      {
        path: 'products',
        component: ProductsListComponent,
      },
      {
        path: 'products/:productId',
        redirectTo: 'products',
        pathMatch: 'full',
      },
      {
        path: 'products/:productId/edit',
        component: ProductListEditComponent,
      },
      {
        path: 'orders',
        component: OrdersListComponent,
      },
    ],
  },
];
