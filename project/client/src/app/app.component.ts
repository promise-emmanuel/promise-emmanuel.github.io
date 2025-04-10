import { Component } from '@angular/core';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
}



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'client';
// }
