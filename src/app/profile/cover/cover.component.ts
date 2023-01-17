import { ChatService } from "@/app/services/chat/chat.service";
import { FriendshipsService } from "@/app/services/friendships/friendships.service";
import { ImageUploadService } from "@/app/services/profile/image-upload-service1.service";
import { ProfileService } from "@/app/services/profile/profile.service";
import { UpdateProfileDto } from "@/app/services/profile/update-profile.dto";
import { Profile } from "@/types/profile.type";
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
    private readonly chatService: ChatService,
    private readonly router: Router,
    private toastrService: ToastrService,
    private profileService: ProfileService,
    private imageUploadService: ImageUploadService,
  ) { }

  ngOnInit(): void {
    console.log(this.profile);
    console.log(this.profile.cover);
  }

  sendFriendRequest() {
    if (this.profile) {
      this.friendshipService
        .sendFriendRequest(this.profile.id)
        .then(() => this.showSuccess())
        .catch((e) => {
          console.error(e);
          const errorMessage =
            e.error.message?.join?.(" ") ||
            e.error.message ||
            "An error has occured, Please try again later";
          this.showError(errorMessage);
        });
    }
  }

  async openChat() {
    if (this.profile) {
      this.chatService.getChatWith(this.profile.id)
        .then(chat => {
          this.router.navigate(["messenger", chat.id])
        })
        .catch(e => {
          console.error(e);
          const errorMessage =
            e.error.message?.join?.(" ") ||
            e.error.message ||
            "An error has occured, Please try again later";
          this.showError(errorMessage);
        })
    }
  }

  showSuccess() {
    this.toastrService.success("Invitation successful!", "Friend request sent");
  }

  showError(message: string) {
    this.toastrService.error("Invitation Failed!", message);
  }

  uploadFile(event: any) {
    const updateProfileDto = new UpdateProfileDto();
    const file = event.target.files[0];
    let avatar = true;
    if (event.target.name === 'cover') {
      updateProfileDto.cover = file;
      avatar = false;
    }
    else if (event.target.name === 'avatar') {
      updateProfileDto.avatar = file;
    }
    this.profileService.updateProfile(updateProfileDto)
      .then((profile) => {
        this.profile = profile;
        this.imageUploadService.notifyImageUploaded(this.profile);
        this.toastrService.success(
          "Profile updated!",
          (avatar ? "Avatar " : "Cover ") + "updated successfully"
        );
      }).catch((e) => {
        this.toastrService.error(e.error.errorMessage);
      });
  }

}
