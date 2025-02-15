import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from "../document.model";
import { WindRefService } from '../wind-ref.service';


@Component({
  selector: 'app-document-detail',
  standalone: false,
  
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document | null = null;
  // document!: Document;

  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    private router: Router,
    private windRefService: WindRefService
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        const id = params['id'];
        if (id) {
          this.document = this.documentService.getDocument(id);
        } else {
          this.document = null;
        }
      });
      
      this.nativeWindow = this.windRefService.getNativeWindow();
      console.log('Native Window:', this.nativeWindow);
  }

  // ngOnInit() {
    // this.nativeWindow = this.windRefService.getNativeWindow();
  // }

  onView() {
    console.log('Document:', this.document);
    if (this.document?.url) {
      this.nativeWindow.open(this.document.url);
    } else {
      console.warn('No url available for this document')
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }

}
