import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "messenger-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit {
  @Input() title = "Messaging";
  isDropdownOpen = false;

  isNotificationsOpen = false;

  constructor() {}

  ngOnInit(): void {}
  onAvatarClick() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onNotificationsClick() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  handleNotificationsToggle(event: boolean) {
    this.isNotificationsOpen = event;
  }

  handleToggle(event: boolean) {
    this.isDropdownOpen = event;
  }
}
