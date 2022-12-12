import { LastMessageSeen } from '@/app/services/chat/chat.service';
import { LocaleService } from '@/app/services/locale/locale.service';
import { Message } from '@/types/chat.type';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chat-head',
  templateUrl: './chat-head.component.html'
})
export class ChatHeadComponent implements OnInit {
  @Input()
  right: boolean = false;

  @Input()
  messages: Message[] = [];

  user?: any;

  constructor(
    private localeService: LocaleService,
  ) {
    this.user = this.localeService.getUser();
  }

  ngDoCheck(): void {    
    if (this.user?.profile.id === this.messages[0]?.profile.id) {
      this.right = true;
    }    
  }

  ngOnInit(): void {
  }

}
