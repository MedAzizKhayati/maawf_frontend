import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { ProfileComponent } from "./profile.component";

const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent,
    children: [{ path: ":id", component: ProfilePageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
