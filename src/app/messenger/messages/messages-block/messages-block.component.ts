import { ChatService } from '@/app/services/chat/chat.service';
import { LocaleService } from '@/app/services/locale/locale.service';
import { Chat, GroupChatToProfile, Message } from '@/types/chat.type';
import { Profile } from '@/types/profile.type';
import User from '@/types/user.type';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'messages-block',
  templateUrl: './messages-block.component.html'
})
export class ChatHeadComponent {
  @ViewChild('chatHead')
  chatHead: ElementRef;

  @Input()
  right: boolean = false;

  @Input()
  messages: Message[] = [];

  @Input()
  chat: Chat;

  @Input()
  shouldMarkAsSeen: boolean = false;

  @Output()
  openImage = new EventEmitter<string>();

  user?: User;
  groupToProfile?: GroupChatToProfile;

  profiles: { [key: string]: Profile } = {};

  subscriptions: Subscription[] = [];

  constructor(
    private localeService: LocaleService,
    private chatService: ChatService
  ) {
    this.user = this.localeService.getUser();
    const sub = this.localeService.user$.subscribe(user => this.user = user);
    this.subscriptions.push(sub);
  }

  ngDoCheck(): void {
    if (this.user?.profile.id === this.messages[0]?.profile.id) {
      this.right = true;
    }
    if(!this.chat)
      return;

    this.groupToProfile =
      this.groupToProfile || this.chat.groupChatToProfiles.find((g) => g.profile.id === this.messages[0]?.profile.id);

    !Object?.keys(this.profiles)?.length &&
      this.messages.forEach(msg => {
        Object.keys(msg.seen || {}).filter(id => this.user.profile.id !== id).forEach(key => {
          this.profiles[key] = this.chat.groupChatToProfiles.find((g) => g.profile.id === key)?.profile;
        })
      })
  }

  deleteMessage(message: Message) {
    this.chatService.deleteMessage(message.id, this.chat.id);
  }

  openImageViewer(src: string) {
    this.openImage.emit(src);
  }

  ngAfterViewInit(): void {
    // intersection observer
    if (!this.shouldMarkAsSeen) return;
    const observer = new IntersectionObserver((entries) => {
      if (!this.shouldMarkAsSeen) return;
      if (entries[0].isIntersecting) {
        this.chatService.markAsSeen(this.messages[0]);
        this.shouldMarkAsSeen = false;
      }
    }, { threshold: 0.5 });
    observer.observe(this.chatHead.nativeElement.querySelector('.latest') as Element);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
