import { FriendshipsService } from '@/app/services/friendships/friendships.service';
import { Profile } from '@/types/profile.type';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html'
})
export class CoverComponent implements OnInit {
  @Input()
  profile?: Profile;

  @Input()
  me: boolean = true;

  constructor(
    private readonly friendshipService: FriendshipsService
  ) { }

  ngOnInit(): void {

  }

  sendFriendRequest() {
    if (this.profile) {
      this.friendshipService.sendFriendRequest(this.profile.id);
    }
  }

}
