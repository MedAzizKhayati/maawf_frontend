import { ChatService } from '@/app/services/chat/chat.service';
import { Chat, Message } from '@/types/chat.type';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'messenger-messages',
  templateUrl: './messages.component.html',
})
export class MessagesComponent {
  @ViewChild('messagesContainer')
  messagesContainer?: ElementRef;
  id = '';
  settings: boolean = true;
  chat?: Chat;
  messages: Message[][] = [];
  subscriptions: Subscription[] = [];
  loading = false;
  imageViewer = false;
  imageViewerSrc = '';

  constructor(
    public chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router,
    public toastService: ToastrService,
  ) {
    const sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.init();
    });
    this.subscriptions.push(sub);
  }

  private init() {
    if (this.messagesContainer) this.messagesContainer.nativeElement.scrollTop = 0;
    this.navigateIfNoChat();
    this.update();
    this.getMessages();
    const chatSub =
      this.chatService.subscribeToChat(this.id).subscribe(
        this.update.bind(this)
      );
    this.subscriptions.push(chatSub);
  }

  private navigateIfNoChat() {
    this.chatService.getChat(this.id).then(chat => {
      this.chat = chat;
      console.log(chat);
      if (!this.chat) this.router.navigate(['messenger'])
    }).catch(err => {
      this.toastService.error(err.error.errorMessage);
      this.router.navigate(['messenger'])
    });
  }

  private update(chat?: Chat) {
    this.messages = this.chatService.getMessageBlocks(this.id);
    if (!chat) return;
    this.chat = chat;
  }

  async getMessages() {
    if (this.loading) return;
    this.loading = true;
    await this.chatService.getNextMessages(this.id);
    this.loading = false;
  }

  closeImageViewer() {
    this.imageViewer = false;
  }

  openImageViewer(src: string) {
    this.imageViewerSrc = src;
    this.imageViewer = true;
  }

  toggleSettings() {
    this.settings = !this.settings;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
