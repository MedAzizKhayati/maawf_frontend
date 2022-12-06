import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chat-item',
  templateUrl: './chat-item.component.html',
})
export class ChatItemComponent implements OnInit {
  @Input()
  selected: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
