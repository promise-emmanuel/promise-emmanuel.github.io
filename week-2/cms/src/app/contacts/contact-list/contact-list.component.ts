import { Component, OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  subscription: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // ✅ Fix: Subscribe to getContacts() instead of assigning it directly
    this.subscription = this.contactService.getContacts().subscribe({
      next: (contacts: Contact[]) => {
        this.contacts = contacts;
      },
      error: (error) => console.error('Error fetching contacts:', error)
    });

    // ✅ Subscribe to contact changes
    this.subscription.add(
      this.contactService.contactChangedEvent.subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      )
    );
  }

  search(value: string) {
    this.term = value;
  }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.next(contact);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


// import { Component, Output, EventEmitter } from '@angular/core';
// import { Contact } from '../../contact.model'
// import { ContactService } from '../contact.service';

// @Component({
//   selector: 'app-contact-list',
//   standalone: false,
  
//   templateUrl: './contact-list.component.html',
//   styleUrl: './contact-list.component.css'
// })
// export class ContactListComponent {
//   @Output() selectedContactEvent =new EventEmitter<Contact>();
//   contacts: Contact[] = [
//     new Contact('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', 'assets/images/jacksonk.jpg', null),
//     new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', 'assets/images/barzeer.jpg', null),
//   ];

//   onSelected(contact: Contact) {
//     this.selectedContactEvent.emit(contact);
//   }
// }
