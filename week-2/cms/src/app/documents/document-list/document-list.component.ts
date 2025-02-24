import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from "../document.model";
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription!: Subscription;
    
  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();

    // subsribe to the subject
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      });    

    // old code
    // this.documents = [...new Set(this.documentService.getDocuments())]; 
    // this.documentService.documentSelectedEvent.subscribe((documents: Document[]) => {
      // this.documents = documents
    // });
  }
  
  ngOnDestroy(): void {
    // unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
