import { ProfileService } from "@/app/services/profile/profile.service";
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

  constructor(
    private readonly profileService: ProfileService,
  ) {
    this.profile = this.profileService.getMyProfile();
  }

  ngOnInit(): void { }
  onAvatarClick() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSearch($event: any) {
    const query = $event.target.value.trim();
    const changed = query !== this.searchQuery;
    if(!changed || !query) return;
    this.searchQuery = query;
    this.isSearchOpen = true;
    if(this.timeoutId) {
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
}
