import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../../contact.model';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-detail',
  standalone: false,
  
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  @Input() contact: Contact | null = null;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id']; // Get the contact ID from the route
      this.contactService.getContact(id).subscribe((contact: Contact) => {
        this.contact = contact; // Assign the contact to the component
      }); // Fetch contact details
    });
  }

  onEditContact() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteContact(contact: Contact) {
    if (!contact) return;
    this.contactService.deleteContact(contact.id);
    this.router.navigate(['/contacts']);
  }  

}
