import { LocaleService } from '@/app/services/locale/locale.service';
import { Chat } from '@/types/chat.type';
import { Profile } from '@/types/profile.type';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chatName'
})
export class ChatNamePipe implements PipeTransform {

  constructor(
    private readonly localeService: LocaleService
  ) {}

  transform(chat: Chat | null | undefined): string {
    if (!chat) return '';
    const me = this.localeService.getUser();
    if (chat.name) {
      return chat.name;
    }
    if (chat.isPrivate) {
      const user = chat.groupChatToProfiles.find(user => user.id !== me.id);
      if (user) {
        return user.nickname || this.getFullName(user.profile);
      }
      return '';
    } else {
      const users = chat.groupChatToProfiles.filter(user => user.id !== me.id);
      return users.slice(0, 2).map(user => user.nickname || user.profile.firstName).join(', ');
    }
  }

  getFullName(user: Profile) {
    return user.firstName + ' ' + user.lastName;
  }

}
