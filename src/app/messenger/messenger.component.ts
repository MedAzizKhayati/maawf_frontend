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
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly chatService: ChatService,
  ) {
  }

  ngOnInit(): void {
    this.redirectIfNoChat();
    this.chatService.chatsSubject$.subscribe((_) => {
      this.redirectIfNoChat();
    });
  }

  redirectIfNoChat() {
    const chats = this.chatService.getChatList();
    if (chats.length !== 0 && !this.route.firstChild) {
      this.router.navigate(['messenger', chats[0].id]);
    }
  }

  ngOnChanges(): void {
  }

}
