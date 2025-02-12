import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../messages/message.service';


@Component({
  selector: 'app-message-list',
  standalone: false,
  
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {}
  
  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.messageService.messageChangedEvent.subscribe(
      (message: Message[]) => {
        this.messages = this.messages;
      }
    );
  }

  onAddMessage(message: Message) {
    this.messageService.addMessage(message);
  }
}