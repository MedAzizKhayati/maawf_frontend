import { ChatService, LastMessageSeen } from '@/app/services/chat/chat.service';
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
  messagesDiv?: ElementRef;
  id = '';
  settings: boolean = false;
  chat?: Chat;
  messages: Message[][] = [];
  subscriptions: Subscription[] = [];
  loading = true;

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (this.messagesDiv) {
        this.messagesDiv.nativeElement.scrollTop = 0;
      }
      this.id = params['id'];
      this.subscriptions.forEach(sub => sub.unsubscribe());
      const chatSub = this.chatService.subscribeToChat(this.id).subscribe((chat) => {
        this.chat = chat;
        this.messages = this.chatService.getMessageBlocks(this.id);
      });
      this.getMessages();
      this.subscriptions = [
        chatSub,
      ]
    });
  }

  async getMessages() {
    if (this.loading) return;
    this.loading = true;
    await this.chatService.getNextMessages(this.id);
    this.loading = false;
  }

  ngOnInit(): void {
  }

  onScroll() {

    const loader = document.getElementById('loader');
    if (loader) {
      const rect = loader.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        this.getMessages();
      }
    }
  }
  toggleSettings() {
    this.settings = !this.settings;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
