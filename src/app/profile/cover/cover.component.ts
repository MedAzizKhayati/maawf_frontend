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
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  sendFriendRequest() {
    if (this.profile) {
      try {
        this.friendshipService
          .sendFriendRequest(this.profile.id)
          .then(() => this.showSuccess());
      } catch (e) {
        console.error(e);
        const errorMessage =
          e.error.message?.join?.(" ") ||
          e.error.message ||
          "An error has occured, Please try again later";
        this.showError(errorMessage);
      }
    }
  }

  showSuccess() {
    this.toastrService.success("Invitation successful!", "Friend request sent");
  }

  showError(message: string) {
    this.toastrService.error("Invitation Failed!", message);
  }
}
