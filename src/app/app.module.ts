import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { MessengerModule } from "./messenger/messenger.module";
import { SocketIoModule } from 'ngx-socket-io';
import { AppRoutingModule } from "./app-routing.module";

import { RouterModule } from "@angular/router";
import { ButtonComponent } from "./shared/button/button.component";
import { StandardInputComponent } from "./shared/standard-input/standard-input.component";
import { AuthModule } from "./auth/auth/auth.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SocketIoModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    MessengerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
