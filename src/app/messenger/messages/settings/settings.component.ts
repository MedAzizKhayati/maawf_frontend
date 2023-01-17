import { ChatService } from '@/app/services/chat/chat.service';
import { UpdateMemberDto } from '@/app/services/chat/update-member.dto';
import { Chat } from '@/types/chat.type';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'messages-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  @Input()
  toggle: boolean;

  @Input()
  chat: Chat;

  chatName: string;
  nickname: { [key: string]: string; } = {};

  constructor(
    public chatService: ChatService,
    public toastService: ToastrService,
    public router: Router,
  ) { }

  updateChatName() {
    this.chatName = this.chatName.trim();
    if (this.chatName === this.chat?.name || !this.chatName) return;
    this.chatService.updateChatName(this.chat.id, this.chatName)
      .then(() => {
        this.toastService.success('Chat updated!', 'Chat name updated successfully');
      })
      .catch(err => {
        this.toastService.error('An error has occured', err.error.errorMessage);
      });
  }

  updateNickname(id: string) {
    const updateMemberDto = new UpdateMemberDto(
      id,
      this.nickname[id]
    );
    this.chatService.updateGroupMember(this.chat.id, updateMemberDto)
      .then(() => {
        this.toastService.success('Chat updated!', 'Nickname updated successfully');
      })
      .catch(err => {
        this.toastService.error('An error has occured', err.error.errorMessage);
      });
  }

  ngOnChanges() {
    this.chat.groupChatToProfiles.forEach((member) => {
      this.nickname[member.id] = member.nickname;
    });
  }

  deleteGroupChat() {
    this.chatService.deleteGroupChat(this.chat.id)
      .then(() => {
        this.toastService.success('Chat deleted');
        this.router.navigate(['/messenger']);
      })
      .catch(err => {
        this.toastService.error(err.error.errorMessage);
      });
  }
}
