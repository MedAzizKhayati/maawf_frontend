import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { MessengerModule } from "../messenger/messenger.module";
import { CoverComponent } from "./cover/cover.component";
import { AvatarComponent } from "./cover/avatar/avatar.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ProfileComponent, CoverComponent, AvatarComponent],
  imports: [CommonModule, ProfileRoutingModule, MessengerModule, SharedModule],
})
export class ProfileModule {}
