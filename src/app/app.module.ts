import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { MessengerModule } from "./messenger/messenger.module";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    MessengerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
