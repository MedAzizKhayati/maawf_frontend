import { ChatService } from '@/app/services/chat/chat.service';
import { Chat } from '@/types/chat.type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'messenger-chats',
  templateUrl: './chats.component.html',
})
export class ChatsComponent implements OnInit {
  chats: Chat[] = [];
  constructor(
    private chatService: ChatService,
  ) {
    this.chatService.chatsSubject$.subscribe(() => {
      this.chats = this.chatService.getChatList();
    });
  }

  ngOnInit(): void {
  }

}
