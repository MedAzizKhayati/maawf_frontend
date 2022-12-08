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
  message: Message = {} as Message;

  @Input()
  messages: Message[] = [];

  user: any = {};

  array: number[] = Array(Math.floor(Math.random() * 5 + 1)).fill(0);
  constructor(
    private localeService: LocaleService,
  ) {
    for (let index = 0; index < this.array.length; index++) {
      this.array[index] = Math.random() * 80 + 10;
    }
    this.user = this.localeService.getUser();
  }

  ngDoCheck(): void {    
    if (this.user.profile.id === this.messages[0]?.profile.id) {
      this.right = true;
    }
  }

  ngOnInit(): void {
  }

}
