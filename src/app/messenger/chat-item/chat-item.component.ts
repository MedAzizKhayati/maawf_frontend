import { Chat } from '@/types/chat.type';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'chat-item',
  templateUrl: './chat-item.component.html',
})
export class ChatItemComponent implements OnInit {
  selected: boolean = false;
  id: string = '';

  @Input()
  chat: Chat = {} as Chat;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.firstChild?.params.subscribe(params => {      
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.selected = this.id === this.chat.id;
  }

  navigateToChat() {
    this.router.navigate(['messenger', this.chat.id]);
  }

}
