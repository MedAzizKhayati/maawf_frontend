import { Profile } from '@/types/profile.type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendshipsService } from '../services/friendships/friendships.service';
import { LocaleService } from '../services/locale/locale.service';
import { ProfileService } from '../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  profile?: Profile;
  friends: Profile[] = [];

  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly profileService: ProfileService,
    private readonly friendshipService: FriendshipsService
  ) {
    if (!this.activeRoute.firstChild) {
      this.profile = this.profileService.getMyProfile();
    }
    this.activeRoute.firstChild?.params.subscribe(params => {
      this.profileService.getProfileById(params['id']).then(profile => {
        this.profile = profile;
      });
    });
    this.friendshipService.getFriendships().then(friends => {
      this.friends = friends.map(friend => friend.sender.id === this.profile?.id ? friend.receiver : friend.sender);
    });
  }

  ngOnInit(): void {
  }

}
