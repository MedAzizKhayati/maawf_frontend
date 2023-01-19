import { Profile } from '@/types/profile.type';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html'
})
export class AvatarComponent implements OnInit {
  @Output() fileChanged = new EventEmitter<Event>();
  @Input() profile: Profile;
  @Input() me: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
