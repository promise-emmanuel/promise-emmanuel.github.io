import { Component } from '@angular/core';
import { Contact } from '../../contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
  contact: Contact = new Contact(
    '1', 
    'J. Kent Jackson', 
    'jacksonk@byui.edu',
    '208-498-3214',
    'assets/images/jacksonk.jpg',
     null
  )

}
