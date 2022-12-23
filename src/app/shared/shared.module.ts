import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterButtonComponent } from "./filter-button/filter-button.component";
import { HeroIconModule, allIcons } from "ng-heroicon";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ButtonComponent } from "./button/button.component";
import { StandardInputComponent } from "./standard-input/standard-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InitialsPipe } from "./pipes/initials.pipe";
import { TimeAgoPipe } from "./pipes/time-ago.pipe";
import { ModalComponent } from "./modal/modal.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from "./header/header.component";
import { DropdownComponent } from "./header/dropdown/dropdown.component";
import { NotificationsComponent } from './header/notifications/notifications.component';
import { SafeResourceUrlPipe } from './pipes/safe-resource-url.pipe';
import { RouterModule } from "@angular/router";
import { SearchComponent } from './header/search/search.component';

@NgModule({
  declarations: [
    FilterButtonComponent,
    ButtonComponent,
    StandardInputComponent,
    InitialsPipe,
    TimeAgoPipe,
    ModalComponent,
    PostComponent,
    HeaderComponent,
    DropdownComponent,
    NotificationsComponent,
    SafeResourceUrlPipe,
    SearchComponent
  ],
  imports: [
    InfiniteScrollModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HeroIconModule.forRoot(
      {
        ...allIcons,
      },
      {
        defaultHostDisplay: "inlineBlock", // default 'none'
        attachDefaultDimensionsIfNoneFound: true, // default 'false'
      }
    ),
    MatProgressSpinnerModule,
  ],
  exports: [
    FilterButtonComponent,
    ButtonComponent,
    ModalComponent,
    HeroIconModule,
    InfiniteScrollModule,
    StandardInputComponent,
    InitialsPipe,
    TimeAgoPipe,
    MatProgressSpinnerModule,
    PostComponent,
    HeaderComponent,
    SafeResourceUrlPipe
  ],
})
export class SharedModule {}
