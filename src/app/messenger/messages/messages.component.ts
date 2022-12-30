import { ChatService } from '@/app/services/chat/chat.service';
import { UpdateMemberDto } from '@/app/services/chat/update-member.dto';
import { Chat, Message } from '@/types/chat.type';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  nickname: any = {};
  chatName = '';

  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const routeSub = this.route.params.subscribe(params => {
      if (this.messagesContainer) this.messagesContainer.nativeElement.scrollTop = 0;
      this.id = params['id'];
      this.chatService.getChat(this.id).then(chat => {
        this.chat = chat;
        if (!this.chat) this.router.navigate(['messenger'])
      })
      // this.messages = this.chatService.getMessageBlocks(this.id);
      const chatSub = this.chatService.subscribeToChat(this.id).subscribe((chat) => {
        this.chat = chat;
        // this.messages = this.chatService.getMessageBlocks(this.id);
        this.chat.groupChatToProfiles.forEach((member) => {
          this.nickname[member.id] = member.nickname;
        });
      });
      this.getMessages();
      this.subscriptions.push(chatSub);
    });
    this.subscriptions.push(routeSub);
    // setInterval(() => {
    //   this.getMessages();
    // }, 2000);
  }

  async getMessages() {
    if (this.loading) return;
    this.loading = true;
    await this.chatService.getNextMessages(this.id);
    this.loading = false;
  }

  updateChatName() {
    this.chatName = this.chatName.trim();
    if (this.chatName === this.chat?.name || !this.chatName) return;
    this.chatService.updateChatName(this.id, this.chatName);
  }

  toggleSettings() {
    this.settings = !this.settings;
  }

  updateNickname(id: string) {
    const updateMemberDto = new UpdateMemberDto(
      id,
      this.nickname[id]
    );
    this.chatService.updateGroupMember(this.id, updateMemberDto);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
