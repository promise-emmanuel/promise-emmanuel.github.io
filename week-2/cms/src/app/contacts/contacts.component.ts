import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model'
import { ContactService } from '../contacts/contact.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact | null = null;

  constructor(private contactService: ContactService) {}
  // ngOnInit(): void {
    // throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;
    });
  }
}
