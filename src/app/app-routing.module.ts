import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthRoutingModule } from "./auth/auth-routing.module";
import { MessengerRoutingModule } from "./messenger/messenger-routing.module";
const routes: Routes = [];

@NgModule({
  imports: [MessengerRoutingModule, AuthRoutingModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
