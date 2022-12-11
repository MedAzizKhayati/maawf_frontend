import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MessagesComponent } from "./messages/messages.component";
import { MessengerComponent } from "./messenger.component";

const routes: Routes = [{
    path: "messenger",
    component: MessengerComponent,
    children: [
        { path: ":id", component: MessagesComponent },
    ],
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class MessengerRoutingModule { }