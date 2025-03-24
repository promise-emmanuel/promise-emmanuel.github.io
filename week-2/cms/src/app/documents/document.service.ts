import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Document } from './document.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;
  private firebaseUrl = 'https://promise-cms-default-rtdb.firebaseio.com/documents.json';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<Document[]> {
    return this.http.get<{ [key: string]: Document }>(this.firebaseUrl).pipe(
      map((documentsData) => documentsData ? Object.values(documentsData) : []),
      tap((documents) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.sortDocuments();
        this.documentListChangedEvent.next(this.documents.slice());
      })
    );
  }

  getDocument(id: string): Observable<Document | null> {
    return this.getDocuments().pipe(
      map((documents) => documents.find(document => document.id === id) || null)
    );
  }

  private getMaxId(): number {
    return this.documents.reduce((max, doc) => Math.max(max, +doc.id), 0);
  }

  private sortDocuments(): void {
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
  }

  storeDocuments(): void {
    this.http.put(this.firebaseUrl, this.documents).subscribe({
      next: () => this.documentListChangedEvent.next(this.documents.slice()),
      error: (error) => console.error('Error storing documents:', error)
    });
  }

  addDocument(newDocument: Document): void {
    if (!newDocument) return;
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) return;
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(documentId: string): void {
    this.documents = this.documents.filter(doc => doc.id !== documentId);
    this.storeDocuments();
  }
}



// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { Document } from './document.model';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// // import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
// // import { EventEmitter } from 'stream';

// @Injectable({
//   providedIn: 'root'
// })
// export class DocumentService {
//   documents: Document[] = [];
//   documentListChangedEvent = new Subject<Document[]>();
//   maxDocumentId: number;
//   // https://promise-cms-default-rtdb.firebaseio.com/
//   firebaseUrl = 'https://promise-cms-default-rtdb.firebaseio.com/documents.json';

//   // documentSelectedEvent = new EventEmitter<Document[]>();

//   constructor(private http: HttpClient) {
//     this.getDocuments();
//   }

//   getDocuments(): Document[] {
//     return this.documents.slice();
//   } 

//   getDocument(id: string): Document | null {
//     return this.documents.find(doc => doc.id === id) || null;
//   }

//   private getMaxId(): number {
//     let maxId = 0;
//     for (let document of this.documents) {
//       const currentId = parseInt(document.id, 10);
//       if (currentId > maxId) {
//         maxId = currentId;
//       }
//     }
//     return maxId;
//   }
  
//   addDocument(newDocument: Document) {
//     if (!newDocument) return;

//     this.maxDocumentId++;
//     newDocument.id = this.maxDocumentId.toString();
//     this.documents.push(newDocument);
//     this.documentListChangedEvent.next(this.documents.slice());
//   }

//   updateDocument(originalDocument: Document, newDocument: Document) {
//     if (!originalDocument || !newDocument) return;

//     const pos = this.documents.indexOf(originalDocument);
//     if (pos < 0) return;

//     newDocument.id = originalDocument.id;
//     this.documents[pos] = newDocument;
//     this.documentListChangedEvent.next(this.documents.slice());
//   }

//   deleteDocument(document: Document) {
//     if (!document) return;

//     const pos = this.documents.indexOf(document);
//     if (pos < 0) return;

//     this.documents.splice(pos, 1);
//     this.documentListChangedEvent.next(this.documents.slice());

//   }
// }

