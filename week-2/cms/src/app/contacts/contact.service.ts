import { Injectable } from '@angular/core';
import { Contact } from '../contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = []
  constructor() {
    // add code later
   }
}
