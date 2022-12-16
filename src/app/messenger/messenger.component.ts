import { Chat } from '@/types/chat.type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
})
export class MessengerComponent implements OnInit {
  private chats: Chat[] = [];
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly chatService: ChatService,
  ) {    
    this.chatService.chatsSubject$.subscribe((_) => {
      this.chats = this.chatService.getChatList();
      if (this.chats.length !== 0 && !this.route.firstChild) {      
        this.router.navigate(['messenger', this.chats[0].id]);
      }
    });
  }

  ngOnInit(): void {

  }

}
