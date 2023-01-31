import { Profile } from '@/types/profile.type';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-typing-animation',
  templateUrl: './typing-animation.component.html'
})
export class TypingAnimationComponent {
  @Input()
  profile: Profile;
}
