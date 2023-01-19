import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterButtonComponent } from "./filter-button/filter-button.component";
import { HeroIconModule, allIcons } from "ng-heroicon";
import { ButtonComponent } from "./button/button.component";
import { StandardInputComponent } from "./standard-input/standard-input.component";
import { FormsModule } from "@angular/forms";
import { InitialsPipe } from "./pipes/initials.pipe";
import { ElapsedTimePipe } from "./pipes/elapsed-time.pipe";
import { ModalComponent } from "./modal/modal.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PostComponent } from './post/post.component';
import { HeaderComponent } from "./header/header.component";
import { DropdownComponent } from "./header/dropdown/dropdown.component";
import { NotificationsComponent } from './header/notifications/notifications.component';
import { SafeResourceUrlPipe } from './pipes/safe-resource-url.pipe';
import { RouterModule } from "@angular/router";
import { SearchComponent } from './header/search/search.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { LoaderComponent } from './loader/loader.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { FullUrlPipe } from './pipes/full-url.pipe';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';

@NgModule({
  declarations: [
    FilterButtonComponent,
    ButtonComponent,
    StandardInputComponent,
    InitialsPipe,
    ElapsedTimePipe,
    ModalComponent,
    PostComponent,
    HeaderComponent,
    DropdownComponent,
    NotificationsComponent,
    SafeResourceUrlPipe,
    SearchComponent,
    InfiniteScrollDirective,
    LoaderComponent,
    ImageViewerComponent,
    FullUrlPipe,
    UserAvatarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule,
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
    ModalComponent,
    HeroIconModule,
    StandardInputComponent,
    InitialsPipe,
    ElapsedTimePipe,
    MatProgressSpinnerModule,
    PostComponent,
    HeaderComponent,
    SafeResourceUrlPipe,
    InfiniteScrollDirective,
    LoaderComponent,
    ImageViewerComponent,
    FullUrlPipe,
    UserAvatarComponent,
  ],
})
export class SharedModule { }
