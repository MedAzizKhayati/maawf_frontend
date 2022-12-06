import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { allIcons, HeroIconModule } from "ng-heroicon";
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
    HeroIconModule.forRoot(
      {
        ...allIcons,
      },
      {
        defaultHostDisplay: "inlineBlock", // default 'none'
        attachDefaultDimensionsIfNoneFound: true, // default 'false'
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
