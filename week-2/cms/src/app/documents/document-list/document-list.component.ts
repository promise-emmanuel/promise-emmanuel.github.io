import { Component, OnInit } from '@angular/core';
import { Document } from "../document.model";
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  documents: Document[] = [];
    
  constructor(private documentService: DocumentService) {}

  // ngOnInit(): void {
    // this.documents = this.documentService.getDocuments();
  // }

  ngOnInit(): void {
    this.documents = [...new Set(this.documentService.getDocuments())]; 
    this.documentService.documentSelectedEvent.subscribe((documents: Document[]) => {
      this.documents = documents
    });
  }
  
}
