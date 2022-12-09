import { ChatService } from '@/app/services/chat/chat.service';
import { Chat, Message } from '@/types/chat.type';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  loading = false;

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private chatService: ChatService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      // let init = true;
      if(this.messagesDiv){
        this.messagesDiv.nativeElement.scrollTop = 0;
      }
      this.id = params['id'];
      this.subscriptions.forEach(sub => sub.unsubscribe());
      const chatSub = this.chatService.getChat(this.id).subscribe((chat) => {
        this.chat = chat;
        this.messages = this.chatService.getMessageBlocks(this.id);        
        // const scrollTop = this.messagesDiv?.nativeElement.scrollTop;
        // const scrollHeight = this.messagesDiv?.nativeElement.scrollHeight;
        // this.changeDetectionRef.detectChanges();
        // const newScrollHeight = this.messagesDiv?.nativeElement.scrollHeight;
        // const newScrollTop = this.messagesDiv?.nativeElement.scrollTop;
        // if (this.messagesDiv && !init) {          
        //   this.messagesDiv.nativeElement.scrollTop = newScrollTop + newScrollHeight - scrollHeight;
        // }
        // init = false;
      });
      this.getMessages();
      const messagesSub = this.chatService.getMessage(this.id)
        .subscribe(() => null);
      this.subscriptions = [
        chatSub,
        messagesSub
      ]
    });
  }

  getMessages() {
    if (this.loading) return;
    this.loading = true;
    this.chatService.getNextMessages(this.id).then((m) => {      
      this.loading = false;
    })
  }

  ngOnInit(): void {
    document.getElementById("messages")?.addEventListener(
      'scroll',
      (event) => {
        
        const loader = document.getElementById('loader');
        if (loader) {
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
