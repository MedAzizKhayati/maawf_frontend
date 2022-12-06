import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MessengerRoutingModule } from "./messenger/messenger-routing.module";

const routes: Routes = [];

@NgModule({
    imports: [MessengerRoutingModule, RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }