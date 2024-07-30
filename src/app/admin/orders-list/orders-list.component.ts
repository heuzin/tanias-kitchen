import { Component, signal } from '@angular/core';

interface Order {
  id: string;
  user: String;
  date: string;
  total: number;
  paid: string;
  delivered: string;
}

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css',
})
export class OrdersListComponent {
  orders = signal<Order[]>([
    {
      id: '1',
      user: 'Matheus Silva',
      date: '2022-02-16',
      total: 20,
      paid: 'Wed Fev 16',
      delivered: 'Wed Fev 16',
    },
  ]);
}
