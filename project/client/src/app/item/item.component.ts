import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item, ItemService } from '../item.service';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  items: Item[] = [];
  newItem: Item = { name: '', description: '' };
  editItem: Item | null = null;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems().subscribe(data => this.items = data);
  }

  addItem() {
    if (this.newItem.name.trim() === '') return;
    this.itemService.addItem(this.newItem).subscribe(item => {
      this.items.push(item);
      this.newItem = { name: '', description: '' };
    });
  }

  startEdit(item: Item) {
    this.editItem = { ...item };
  }

  updateItem() {
    if (!this.editItem || !this.editItem._id) return;
    this.itemService.updateItem(this.editItem._id, this.editItem).subscribe(() => {
      this.loadItems();
      this.editItem = null;
    });
  }

  deleteItem(id: string) {
    this.itemService.deleteItem(id).subscribe(() => {
      this.items = this.items.filter(item => item._id !== id);
    });
  }
// }

}
