import { Component } from '@angular/core';
import { Message } from '../message.model';


@Component({
  selector: 'app-message-list',
  standalone: false,
  
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message('1', 'Subject 1', 'Message content 1', 'Sender 1'),
    new Message('2', 'Subject 2', 'Message content 2', 'Sender 2'),
    new Message('3', 'Subject 3', 'Message content 3', 'Sender 3')
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}