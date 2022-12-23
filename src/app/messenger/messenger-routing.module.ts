import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../services/auth/auth-guard.service";
import { MessagesComponent } from "./messages/messages.component";
import { MessengerComponent } from "./messenger.component";

const routes: Routes = [
    {
        path: "",
        redirectTo: "messenger",
        pathMatch: "full"
    },
    {
        path: "messenger",
        component: MessengerComponent,
        children: [
            { path: ":id", component: MessagesComponent },
        ],
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class MessengerRoutingModule { }