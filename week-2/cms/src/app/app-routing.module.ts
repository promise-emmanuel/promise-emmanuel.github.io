import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent, children: [
      { path: '', component: DocumentListComponent },  // Default child route (list view)
      { path: 'new', component: DocumentEditComponent }, // Load new document form
      { path: ':id', component: DocumentDetailComponent }, // View document details
      { path: ':id/edit', component: DocumentEditComponent } // Edit document form
    ] 
  },
  { path: 'messages', component: MessageListComponent },
  { path: 'contacts', component: ContactsComponent, children: [
    { path: 'new', component: ContactEditComponent },
    { path: ':id', component: ContactDetailComponent },
    { path: ':id/edit', component: ContactEditComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
