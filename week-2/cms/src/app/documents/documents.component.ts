import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from "./document.model";
import { Subscription } from 'rxjs';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  standalone: false,
  
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit, OnDestroy {
  selectedDocument: Document;
  private documentListChangedSubscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documentListChangedSubscription = this.documentService.documentListChangedEvent.subscribe(
      (documents: Document[]) => {
        // Just pick the first document for demonstration
        this.selectedDocument = documents[0];
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.documentListChangedSubscription) {
      this.documentListChangedSubscription.unsubscribe();
    }
  }

}



  // old code
  // ngOnInit(): void {
    // this.documentService.documentSelectedEvent.subscribe(
      // (document: Document) => {
        // this.selectedDocument = document;
      // }
    // );
  // }