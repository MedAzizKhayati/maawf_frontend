import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  @Output() fileChanged = new EventEmitter<Event>();
  @Input() avatar: string;

  constructor() { }

  ngOnInit(): void {
  }

}
