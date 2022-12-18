import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterButtonComponent } from "./filter-button/filter-button.component";
import { HeroIconModule, allIcons } from "ng-heroicon";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ButtonComponent } from "./button/button.component";
import { StandardInputComponent } from "./standard-input/standard-input.component";
import { ReactiveFormsModule } from "@angular/forms";
import { InitialsPipe } from './pipes/initials.pipe';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from "./header/header.component";
import { DropdownComponent } from "./header/dropdown/dropdown.component";
import { NotificationsComponent } from './header/notifications/notifications.component';

@NgModule({
  declarations: [
    FilterButtonComponent,
    ButtonComponent,
    StandardInputComponent,
    InitialsPipe,
    TimeAgoPipe,
    PostComponent,
    HeaderComponent,
    DropdownComponent,
    NotificationsComponent
  ],
  imports: [
    InfiniteScrollModule,
    CommonModule,
    ReactiveFormsModule,
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
  exports: [
    FilterButtonComponent,
    ButtonComponent,
    HeroIconModule,
    InfiniteScrollModule,
    StandardInputComponent,
    InitialsPipe,
    TimeAgoPipe,
    PostComponent,
    HeaderComponent
  ],
})
export class SharedModule {}
