import { FriendshipsService } from "@/app/services/friendships/friendships.service";
import { ProfileService } from "@/app/services/profile/profile.service";
import { Friendship } from "@/types/friendship.type";
import { Profile } from "@/types/profile.type";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "messenger-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  @Input()
  title = "Messaging";

  isDropdownOpen = false;
  isNotificationsOpen = false;
  isSearchOpen = false;
  searchQuery = "";
  timeoutId: any;

  profile: Profile;
  profiles: Profile[] = [];
  interval: NodeJS.Timer;

  incomingRequests: Friendship[] = [];

  constructor(
    private readonly profileService: ProfileService,
    private readonly friendshipService: FriendshipsService,
  ) {
  }

  ngOnInit(): void {
    this.profile = this.profileService.getMyProfile();
    this.interval = setInterval(() => {
      this.friendshipService.getFriendships("incoming", "pending").then((incomingRequests) => {
        if (JSON.stringify(this.incomingRequests) !== JSON.stringify(incomingRequests))
          this.incomingRequests = incomingRequests;
      })
    }, 3000);
  }

  onAvatarClick() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSearch($event: any) {
    const query = $event.target.value.trim();
    const changed = query !== this.searchQuery;
    if (!changed || !query) return;
    this.searchQuery = query;
    this.isSearchOpen = true;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(async () => {
      this.profiles = await this.profileService.getProfiles(query);
      this.timeoutId = null;
    }, 250);
  }

  onNotificationsClick() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  handleNotificationsToggle(event: boolean) {
    this.isNotificationsOpen = event;
  }

  handleSearchToggle(event: boolean) {
    this.isSearchOpen = event;
  }

  handleToggle(event: boolean) {
    this.isDropdownOpen = event;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
