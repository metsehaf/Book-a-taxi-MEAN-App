import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
const MESSAGE_URL = environment.apiUrl + '/pusher/auth';

const PUSHER_KEY = environment.pusher;

declare const Pusher: any;

@Injectable({ providedIn: 'root' })
export class PusherService {
  pusher: any;
  messagesChannel: any;

  constructor() {
    this.initializePusher();
  }

  initializePusher(): void {
    this.pusher = new Pusher(PUSHER_KEY, {
      cluster: 'us2',
      authEndpoint: MESSAGE_URL,
      // forceTLS: true
    });
    this.messagesChannel = this.pusher.subscribe('private-all-messages');
  }
}
