import { Component, OnInit } from '@angular/core';
import { PusherService } from '../pusher.service';

interface Message {
  MessageText: string;
  userName: string;
}
@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent  implements OnInit {
  userName: string;
  messageText: string;
  messages: Array<Message>;
  constructor(private pusherService: PusherService) {}

ngOnInit() { }
  sendMessage(userName: string, MessageText: string) {
    const message: Message = {
       userName: userName,
       MessageText: MessageText,
    };
    this.pusherService.messagesChannel.bind('client-new-message', message);
      this.messages.push(message);
    }
}
