import { Profile } from "@/types/profile.type";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { FriendshipsService } from "../services/friendships/friendships.service";
import { ProfileService } from "../services/profile/profile.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  profile?: Profile;
  friends: Profile[] = [];
  me = false;

  subscriptions: Subscription[] = [];
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly profileService: ProfileService,
    private readonly friendshipService: FriendshipsService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const myProfile = this.profileService.getMyProfile();
    if (!this.activeRoute.snapshot.params["id"]) {
      this.router.navigate(["profile", myProfile.id]);
    }

    this.activeRoute.params.subscribe((params) => {
      const id = params["id"];
      this.getFriends(id);
      if (id === myProfile?.id) {
        this.profile = myProfile;
        this.me = true;
        const sub = this.profileService.profile$.subscribe((profile) => {
          this.profile = profile;
        });
        this.subscriptions.push(sub);
        return;
      }
      this.profileService.getProfileById(id).then((profile) => {
        this.profile = profile;
        this.me = false;
      });
    });
  }

  getFriends(id: string) {
    this.friendshipService.getFriendships("all", "accepted", undefined, id).then((friends) => {
      this.friends = friends.map((friend) =>
        friend.sender.id === id ? friend.receiver : friend.sender
      );
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
