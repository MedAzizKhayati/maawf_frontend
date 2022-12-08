import { ChatService } from '@/app/services/chat/chat.service';
import { SendMessageDto } from '@/app/services/chat/send-message.dto';
import { Chat, Message } from '@/types/chat.type';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'messenger-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent implements OnInit {
  @ViewChild('messagesDiv')
  messagesDiv: ElementRef | undefined;

  id = '';
  settings: boolean = false;
  chat: Chat | undefined;
  messages: Message[][] = [];
  subscriptions: Subscription[] = [];
  loading = true;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.messagesDiv?.nativeElement.scrollTo?.(0, 0);
      this.id = params['id'];
      this.subscriptions.forEach(sub => sub.unsubscribe());
      const chatSub = this.chatService.getChat(this.id).subscribe((chat) => {
        this.chat = chat;
        this.messages = this.chatService.getMessageBlocks(this.id);
        console.log(this.chat.messages.length);
      });
      this.getMessages();
      const messagesSub = this.chatService.getMessage(this.id).subscribe(() => {
      });
      this.subscriptions = [
        chatSub,
        messagesSub
      ]
    });
  }

  getMessages() {
    this.loading = true;
    this.chatService.getNextMessages(this.id).then(() => {
      this.messages = this.chatService.getMessageBlocks(this.id);
      this.loading = false;
    })
  }

  ngOnInit(): void {
    document.getElementById("messages")?.addEventListener(
      'scroll',
      () => {
        const loader = document.getElementById('loader');
        if (loader && !this.loading) {
          const rect = loader.getBoundingClientRect();
          if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            this.getMessages();
          }
        }
      }
    )
  }

  toggleSettings() {
    this.settings = !this.settings;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
