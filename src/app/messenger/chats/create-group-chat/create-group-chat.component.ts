import { ChatService } from '@/app/services/chat/chat.service';
import { FriendshipsService } from '@/app/services/friendships/friendships.service';
import { ImageUploadService } from '@/app/services/profile/image-upload-service1.service';
import { ProfileService } from '@/app/services/profile/profile.service';
import { Profile } from '@/types/profile.type';
import { Component, Input, OnInit } from '@angular/core';

type SelectableProfile = Profile & { isSelected?: boolean };

@Component({
  selector: 'group-chat-modal',
  templateUrl: './create-group-chat.component.html'
})
export class GroupChatComponent implements OnInit {
  @Input()
  isVisible = false;
  @Input()
  onClose: () => void;
  me: Profile;
  friends: SelectableProfile[] = [];
  members: SelectableProfile[] = [];
  initialize = true;
  query = '';
  timeoutId?: NodeJS.Timeout;
  name?: string;

  constructor(
    private readonly friendshipService: FriendshipsService,
    private readonly profileService: ProfileService,
    private readonly chatService: ChatService,
    private readonly imageUploadService: ImageUploadService,
  ) {
    this.onSubmit = this.onSubmit.bind(this);
    this.me = this.profileService.getMyProfile();
    this.members.forEach((m) => this.imageUploadService.imageUploaded$.subscribe(m => {
      m = m;
    }));
    this.friends.forEach((f) => this.imageUploadService.imageUploaded$.subscribe(f => {
      f = f;
    }));

  }

  async getFriends() {
    return this.friendshipService.getFriendships('all', 'accepted', this.query).then(
      (friendships) => {
        this.friends = friendships.map((friendship) => {
          const friend: SelectableProfile = friendship.sender.id === this.me.id ? friendship.receiver : friendship.sender;
          friend.isSelected = this.members.some((m) => m.id === friend.id);
          return friend;
        });
      }
    )
  }

  toggleMember(member: SelectableProfile) {
    member.isSelected = !member.isSelected;
    if (member.isSelected) {
      this.members.push(member);
    } else {
      this.members = this.members.filter((m) => m.id !== member.id);
    }
  }

  ngDoCheck() {
    if (this.isVisible && this.initialize) {
      this.getFriends();
      this.initialize = false;
    }
  }

  async onSubmit() {
    this.name = this.name?.trim();
    await this.chatService.createGroupChat(this.members, this.name || undefined);
    this.onClose();
    this.members = [];
    this.query = '';
    this.friends = [];
    this.name = '';
    this.initialize = true;
  }

  onSearchChange($event: any) {
    const query = $event.target.value;
    const changed = query !== this.query;
    if (!changed) return;
    this.query = query;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(async () => {
      await this.getFriends();
      this.timeoutId = null;
    }, 250);
  }

  ngOnInit(): void {
    this.members.forEach((m) => this.imageUploadService.imageUploaded$.subscribe(m => {
      m = m;
    }));
    this.friends.forEach((f) => this.imageUploadService.imageUploaded$.subscribe(f => {
      f = f;
    }));

  }

}
