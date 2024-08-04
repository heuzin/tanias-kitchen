import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UserFirestoreService } from '../services/user.firestore.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private userFirestoreService = inject(UserFirestoreService);
  isAuthenticated = computed(() => !!this.authService.authenticated());
  isAdming = computed(
    () =>
      this.userFirestoreService
        .allUsers()
        .find((user) => user.localId === this.authService.authenticated()?.id)
        ?.isAdmin
  );

  displayName = computed(() => this.userService.currentUser()?.displayName);

  constructor() {
    this.userFirestoreService.getAllUsers();
  }

  onLogout() {
    this.authService.logout();
  }
}
