import { Component } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';

  selectedContact: Contact = new Contact(
    '1',
    'J. Kent Jackson',
    'jacksonk@byui.edu',
    '208-498-3214',
    'assets/images/jacksonk.jpg',
    null
  );

  selectedFeature = 'documents';
  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }


}
