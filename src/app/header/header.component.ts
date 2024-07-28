import { Component, output } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  featureSelected = output<'recipe' | 'shopping-list'>();

  onSelect(feature: 'recipe' | 'shopping-list') {
    this.featureSelected.emit(feature);
  }
}
