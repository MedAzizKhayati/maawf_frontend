import { FriendshipsService } from '@/app/services/friendships/friendships.service';
import { Friendship } from '@/types/friendship.type';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent implements OnInit {

  @Input()
  isOpen: boolean = false;

  @Output()
  toggle: EventEmitter<boolean> = new EventEmitter();

  incomingRequests: Friendship[] = [];
  constructor(
    private readonly friendshipService: FriendshipsService,
  ) {
    this.friendshipService.getFriendships("incoming", "pending").then((incomingRequests) => {
      this.incomingRequests = [
        ...incomingRequests, ...incomingRequests,
        ...incomingRequests, ...incomingRequests
      ];
    })
  }

  ngOnInit(): void {
  }

  onClick() {
    this.toggle.emit(!this.isOpen);
  }

  async acceptRequest(id: string) {
    const req = await this.friendshipService.acceptFriendRequest(id);
    if (req.status === "accepted") {
      this.incomingRequests = this.incomingRequests.filter((request) => request.sender.id !== id);
    }
  }

  async declineRequest(id: string) {
    const req = await this.friendshipService.declineFriendRequest(id);
    if (req.status === "rejected") {
      this.incomingRequests = this.incomingRequests.filter((request) => request.sender.id !== id);
    }
  }
}
