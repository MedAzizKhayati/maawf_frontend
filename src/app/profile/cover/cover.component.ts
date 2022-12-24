import { FriendshipsService } from "@/app/services/friendships/friendships.service";
import { Profile } from "@/types/profile.type";
import { Component, Input, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-cover",
  templateUrl: "./cover.component.html",
})
export class CoverComponent implements OnInit {
  @Input()
  profile?: Profile;

  @Input()
  me: boolean = true;

  constructor(
    private readonly friendshipService: FriendshipsService,
    private toastrServicce: ToastrService
  ) {}

  ngOnInit(): void {}

  sendFriendRequest() {
    if (this.profile) {
      this.friendshipService.sendFriendRequest(this.profile.id);
    }
  }

  showSuccess() {
    this.toastrServicce.success('Login successful!', 'Welcome back');
  }
}
