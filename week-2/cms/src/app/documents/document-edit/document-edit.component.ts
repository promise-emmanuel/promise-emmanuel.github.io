import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;
  editMode: boolean = false;
  originalDocument: Document | null = null;
  document: Document = { id: '', name: '', description: '', url: '', children:[]};

  constructor(
    private documentService: DocumentService,
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

      this.documentService.getDocument(this.id).subscribe(
        (document: Document) => {
          if (!document) {
            return;
          }
          this.originalDocument = document;
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        },
        (error) => {
          console.error('Error fetching document:', error);
        }
      );

      // this.originalDocument = this.documentService.getDocument(this.id);
      // if (!this.originalDocument) {
        // return;
      // }
      // this.editMode = true;
      // this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value; // get values from form fields
    const newDocument = new Document(
      this.id,
      value.name,
      value.description,
      value.url,
      value.children // assuming children is an array
    );

    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }
}



// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Document } from '../document.model';
// import { DocumentService } from '../document.service';
// import { ActivatedRoute, Params, Router } from '@angular/router';


// @Component({
//   selector: 'app-document-edit',
//   standalone: false,
  
//   templateUrl: './document-edit.component.html',
//   styleUrls: ['./document-edit.component.css']
// })
// export class DocumentEditComponent implements OnInit {
//   originalDocument: Document | null = null;
//   document: Document = { id: '', name: '', description: '', url: '', children: [] };
//   editMode: boolean = false;

//   constructor(
//     private documentService: DocumentService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {}

//   ngOnInit(): void {}

//   onSubmit(form: NgForm) {
//     // if (form.invalid) {
//       // return;
//     // }
//     // console.log('Form submitted:', form.value);
//   }

//   onCancel() {
//     // console.log('Edit cancelled');
//   }
// }
