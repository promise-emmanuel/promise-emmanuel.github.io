import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { Contact } from '../../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact | null = null;
  contact: Contact = new Contact('', '', '', '', '', null);
  groupContacts: Contact[] = [];
  editMode = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      // Clone the original contact
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      // Clone group if it exists
      if (this.originalContact.group) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const value = form.value;
    const newContact = new Contact(
      '', // new contact gets an id from the service
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  // Check if the new contact is already in the group
  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) return true;
    if (this.contact && newContact.id === this.contact.id) return true;
    return this.groupContacts.some(c => c.id === newContact.id);
  }

  // Called when a contact is dropped into the group drop zone
  // addToGroup(event: CdkDragDrop<Contact[]>): void {
    // const selectedContact: Contact = event.item.data;
    // if (this.isInvalidContact(selectedContact)) {
      // alert("This contact is already in the group!");
      // return;
    // }
    // this.groupContacts.push(selectedContact);
  // }

  addToGroup(event: CdkDragDrop<Contact[]>): void {
    console.log('Drop event:', event);
    const selectedContact: Contact = event.item.data;
    console.log('Dropped contact:', selectedContact);
    if (this.isInvalidContact(selectedContact)) {
      alert("This contact is already in the group!");
      return;
    }
    this.groupContacts.push(selectedContact);
    console.log('Updated groupContacts:', this.groupContacts);
  }
  

  // Remove a contact from the group by index
  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}





// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params, Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
// import { DndDropEvent } from 'ngx-drag-drop';

// import { Contact } from '../../contact.model';
// import { ContactService } from '../contact.service';


// @Component({
//   selector: 'app-contact-edit',
//   standalone: false,
//   templateUrl: './contact-edit.component.html',
//   styleUrls: ['./contact-edit.component.css']
// })
// export class ContactEditComponent implements OnInit {
//   // Basic properties
//   originalContact: Contact | null = null;
//   contact: Contact = new Contact('', '', '', '', '', null);
//   groupContacts: Contact[] = [];
//   editMode = false;
//   id: string;

//   constructor(
//     private contactService: ContactService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     this.route.params.subscribe((params: Params) => {
//       this.id = params['id'];
//       if (!this.id) {
//         this.editMode = false;
//         return;
//       }
//       this.originalContact = this.contactService.getContact(this.id);
//       if (!this.originalContact) {
//         return;
//       }
//       this.editMode = true;
//       // Clone the original contact
//       this.contact = JSON.parse(JSON.stringify(this.originalContact));
//       // Clone group if it exists
//       if (this.originalContact.group) {
//         this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
//       }
//     });
//   }

//   onSubmit(form: NgForm) {
//     if (form.invalid) {
//       return;
//     }
//     const value = form.value;
//     const newContact = new Contact(
//       '', // new contact gets an id from the service
//       value.name,
//       value.email,
//       value.phone,
//       value.imageUrl,
//       this.groupContacts
//     );
//     if (this.editMode) {
//       this.contactService.updateContact(this.originalContact, newContact);
//     } else {
//       this.contactService.addContact(newContact);
//     }
//     this.router.navigate(['/contacts']);
//   }

//   onCancel() {
//     this.router.navigate(['/contacts']);
//   }

//   // Called when a contact is dropped into the drop zone
//   addToGroup(event: any) {
//     const selectedContact: Contact = event.item.data;
//     if (this.isInvalidContact(selectedContact)) {
//       alert("This contact is already in the group!");
//       return;
//     }
//     this.groupContacts.push(selectedContact);
//   } 
  
//   // addToGroup(event: DndDropEvent): void {
//     // const selectedContact: Contact = event.data;
//     // if (this.isInvalidContact(selectedContact)) {
//       // return;
//     // }
//     // this.groupContacts.push(selectedContact);
//   // }

//   // onRemoveItem(index: number) {
//     // if (index < 0 || index >= this.groupContacts.length) {
//       // return;
//     // }
//     // this.groupContacts.splice(index, 1);
//   // }

//   onRemoveItem(index: number) {
//     if (index >= 0 && index < this.groupContacts.length) {
//       this.groupContacts.splice(index, 1);
//     }
//   }
  

//   isInvalidContact(newContact: Contact): boolean {
//     if (!newContact) return true;
//     if (this.contact && newContact.id === this.contact.id) return true;
//     return this.groupContacts.some(c => c.id === newContact.id);
//   }
// }

// // isInvalidContact(newContact: Contact): boolean {
//   // if (!newContact) return true;
//   // if (this.contact && newContact.id === this.contact.id) return true;
  
//   // return this.groupContacts.some(contact => contact.id === newContact.id);
// // }



// // import { Component, OnInit } from '@angular/core';
// // import { ActivatedRoute, Params, Router } from '@angular/router';
// // import { NgForm } from '@angular/forms';
// // import { Contact } from '../../contact.model';
// // import { ContactService } from '../contact.service';

// // @Component({
// //   selector: 'app-contact-edit',
// //   standalone: false,
// //   templateUrl: './contact-edit.component.html',
// //   styleUrls: ['./contact-edit.component.css']
// // })

// // export class ContactEditComponent implements OnInit {
// //   originalContact: Contact | null = null;
// //   contact: Contact = new Contact('', '', '', '', '', null);
// //   groupContacts: Contact[] = [];
// //   editMode: boolean = false;
// //   id: string;

// //   constructor(
// //     private contactService: ContactService,
// //     private router: Router,
// //     private route: ActivatedRoute
// //   ) {}

// //   ngOnInit(): void {
// //     this.route.params.subscribe((params: Params) => {
// //       this.id = params['id'];
// //       if (!this.id) {
// //         this.editMode = false;
// //         return;
// //       }
// //       this.originalContact = this.contactService.getContact(this.id);
// //       if (!this.originalContact) {
// //         return;
// //       }
// //       this.editMode = true;
// //       // Create a deep copy of the original contact
// //       this.contact = JSON.parse(JSON.stringify(this.originalContact));
// //       // Clone the group array if present
// //       if (this.originalContact.group) {
// //         this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
// //       }
// //     });
// //   }

// //   onSubmit(form: NgForm): void {
// //     if (form.invalid) {
// //       return;
// //     }
// //     const value = form.value;
// //     const newContact = new Contact(
// //       '', // id will be assigned in service if adding new contact
// //       value.name,
// //       value.email,
// //       value.phone,
// //       value.imageUrl,
// //       this.groupContacts
// //     );
// //     if (this.editMode) {
// //       this.contactService.updateContact(this.originalContact, newContact);
// //     } else {
// //       this.contactService.addContact(newContact);
// //     }
// //     this.router.navigate(['/contacts']);
// //   }

// //   onCancel(): void {
// //     this.router.navigate(['/contacts']);
// //   }

// //   // Drag-and-drop related methods:
// //   isInvalidContact(newContact: Contact): boolean {
// //     if (!newContact) return true;
// //     if (this.contact && newContact.id === this.contact.id) return true;
// //     for (let i = 0; i < this.groupContacts.length; i++) {
// //       if (newContact.id === this.groupContacts[i].id) {
// //         return true;
// //       }
// //     }
// //     return false;
// //   }

// //   addToGroup($event: any): void {
// //     const selectedContact: Contact = $event.dragData;
// //     if (this.isInvalidContact(selectedContact)) {
// //       return;
// //     }
// //     this.groupContacts.push(selectedContact);
// //   }

// //   onRemoveItem(index: number): void {
// //     if (index < 0 || index >= this.groupContacts.length) {
// //       return;
// //     }
// //     this.groupContacts.splice(index, 1);
// //   }
// // }



// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-contact-edit',
// //   standalone: false,
  
// //   templateUrl: './contact-edit.component.html',
// //   styleUrls: ['./contact-edit.component.css']
// // })
// // export class ContactEditComponent {

// // }
