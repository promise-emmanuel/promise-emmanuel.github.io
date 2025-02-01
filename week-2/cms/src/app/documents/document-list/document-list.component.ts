import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from "../document.model";

@Component({
  selector: 'app-document-list',
  standalone: false,
  
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  documents: Document[] = [
    {
      id: '1',
      name: 'Document 1',
      description: 'Description of document 1',
      url: 'https://example.com/document1',
      children: []
    },
    {
      id: '2',
      name: 'Document 2',
      description: 'Description of document 2',
      url: 'https://example.com/document2',
      children: []
    },
    {
      id: '3',
      name: 'Document 3',
      description: 'Description of document 3',
      url: 'https://example.com/document3',
      children: []
    },
    {
      id: '4',
      name: 'Document 4',
      description: 'Description of document 4',
      url: 'https://example.com/document4',
      children: []
    },
  ]

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  // method to emit selected document
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
