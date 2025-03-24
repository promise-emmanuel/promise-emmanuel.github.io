import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../message.model';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new Subject<Message[]>();
  private firebaseUrl = 'https://promise-cms-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<Message[]> {
    return this.http.get<{ [key: string]: Message }>(this.firebaseUrl).pipe(
      map((messagesData) => messagesData ? Object.values(messagesData) : []),
      tap((messages) => {
        this.messages = messages;
        this.messageChangedEvent.next(this.messages.slice());
      })
    );
  }

  storeMessages(): void {
    this.http.put(this.firebaseUrl, this.messages).subscribe({
      next: () => this.messageChangedEvent.next(this.messages.slice()),
      error: (error) => console.error('Error storing messages:', error)
    });
  }

  addMessage(message: Message): void {
    this.messages.push(message);
    this.storeMessages();
  }
}

// import { Injectable, EventEmitter } from '@angular/core';
// import { Message } from '../message.model';
// import { MOCKMESSAGES } from '../MOCKMESSAGES';

// @Injectable({
//   providedIn: 'root'
// })
// export class MessageService {
//   messages: Message[] = [];
//   messageChangedEvent = new EventEmitter<Message[]>();

//   constructor() { 
//     this.messages = MOCKMESSAGES;
//   }

//   getMessages(): Message[] {
//     return this.messages.slice();
//   }

//   getMessage(id: string): Message | undefined {
//     return this.messages.find(msg => msg.id === id);
//   }

//   addMessage(message: Message): void {
//     this.messages.push(message);
//     this.messageChangedEvent.emit(this.messages.slice());
//   }
// }
