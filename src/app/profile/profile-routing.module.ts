import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../services/auth/auth-guard.service";
import { ProfileComponent } from "./profile.component";

const routes: Routes = [
  {
    path: "profile",
    component: ProfileComponent,
    children: [{ path: ":id", component: ProfileComponent }],
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
