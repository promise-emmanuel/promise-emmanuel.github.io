import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactSelectedEvent = new Subject<Contact>(); 
  contactChangedEvent = new Subject<Contact[]>();
  contacts: Contact[] = []
  maxContactId: number;
  
  constructor() {
    // add code later
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    return this.contacts.find(contact => contact.id === id) || null;
  }

  private getMaxId(): number {
    let maxId = 0;
    for (let contact of this.contacts) {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId
      }
    }
    return maxId;
  }
  
  addContact(newContact: Contact) {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactChangedEvent.next(this.contacts.slice());
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactChangedEvent.next(this.contacts.slice());
  }

  deleteContact(contactId: string): void {
    this.contacts = this.contacts.filter(contact => contact.id !== contactId);
    this.contactChangedEvent.next(this.contacts.slice())
    // this.contactChangedEvent.emit(this.contacts.slice());
  }
  
}
