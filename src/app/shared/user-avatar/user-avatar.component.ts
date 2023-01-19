import { Profile } from '@/types/profile.type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html'
})
export class UserAvatarComponent {
  @Input()
  profile: Profile;
  @Input()
  size = '3rem';
  @Input()
  rounded = true;
}
