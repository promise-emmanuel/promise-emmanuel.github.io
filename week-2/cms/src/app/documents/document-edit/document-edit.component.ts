import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-document-edit',
  standalone: false,
  
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null = null;
  document: Document = { id: '', name: '', description: '', url: '', children: [] };
  editMode: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    // if (form.invalid) {
      // return;
    // }
    // console.log('Form submitted:', form.value);
  }

  onCancel() {
    // console.log('Edit cancelled');
  }
}
