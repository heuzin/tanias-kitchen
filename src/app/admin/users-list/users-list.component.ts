import { Component, computed, inject, signal } from '@angular/core';
import { UserFirestoreService } from '../../services/user.firestore.service';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';

interface Users {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [LoadingSpinnerComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  private router = inject(Router);
  private userFirestoreService = inject(UserFirestoreService);

  loading = inject(LoaderService).loading;
  users = computed(() => this.userFirestoreService.allUsers());

  constructor() {
    this.userFirestoreService.getAllUsers();
  }

  onEdit(userId: string) {
    this.router.navigate(['admin', 'users', userId, 'edit']);
  }
}
