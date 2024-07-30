import { Component, signal } from '@angular/core';

interface Users {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  users = signal<Users[]>([
    {
      id: '1',
      name: 'Matheus Silva',
      email: 'msilvaqs@outlook.com',
      isAdmin: false,
    },
  ]);
}
