import { Component, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  featureSelected = output<'recipe' | 'shopping-list'>();

  onSelect(feature: 'recipe' | 'shopping-list') {
    this.featureSelected.emit(feature);
  }
}
