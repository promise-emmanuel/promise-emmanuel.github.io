import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';

import { NgModule } from '@angular/core';
import { inject } from '@angular/core';
// import { Routes } from '@angular/router';
// import { DocumentsComponent } from './documents/documents.component';
// import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
// import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
// import { DocumentListComponent } from './documents/document-list/document-list.component';
// import { MessageListComponent } from './messages/message-list/message-list.component';
// import { ContactsComponent } from './contacts/contacts.component';
// import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
// import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { DocumentService } from './documents/document.service';
import { ContactService } from './contacts/contact.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  {
    path: 'documents',
    component: DocumentsComponent,
    children: [
      { path: '', component: DocumentListComponent },
      { path: 'new', component: DocumentEditComponent },
      {
        path: ':id',
        component: DocumentDetailComponent,
        providers: [
          {
            provide: 'getPrerenderParams',
            useFactory: async () => {
              const documentService = inject(DocumentService);
              const documentIds = await documentService.getAllDocumentIds();
              return documentIds.map((id) => ({ id }));
            },
          },
        ],
      },
      { path: ':id/edit', component: DocumentEditComponent },
    ],
  },
  { path: 'messages', component: MessageListComponent },
  {
    path: 'contacts',
    component: ContactsComponent,
    children: [
      { path: 'new', component: ContactEditComponent },
      {
        path: ':id',
        component: ContactDetailComponent,
        providers: [
          {
            provide: 'getPrerenderParams',
            useFactory: async () => {
              const contactService = inject(ContactService);
              const contactIds = await contactService.getAllContactIds();
              return contactIds.map((id) => ({ id }));
            },
          },
        ],
      },
      { path: ':id/edit', component: ContactEditComponent },
    ],
  },
];



// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { DocumentsComponent } from './documents/documents.component';
// import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
// import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
// import { DocumentListComponent } from './documents/document-list/document-list.component';
// import { MessageListComponent } from './messages/message-list/message-list.component';
// import { ContactsComponent } from './contacts/contacts.component';
// import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
// import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';

// const appRoutes: Routes = [
//   { path: '', redirectTo: '/documents', pathMatch: 'full' },
//   { path: 'documents', component: DocumentsComponent, children: [
//       { path: '', component: DocumentListComponent },  // Default child route (list view)
//       { path: 'new', component: DocumentEditComponent }, // Load new document form
//       { path: ':id', component: DocumentDetailComponent }, // View document details
//       { path: ':id/edit', component: DocumentEditComponent } // Edit document form
//     ] 
//   },
//   { path: 'messages', component: MessageListComponent },
//   { path: 'contacts', component: ContactsComponent, children: [
//     { path: 'new', component: ContactEditComponent },
//     { path: ':id', component: ContactDetailComponent },
//     { path: ':id/edit', component: ContactEditComponent }
//   ] }
// ];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
