import { forwardRef, NgModule } from "@angular/core";
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

@NgModule({
  declarations: [
    FilterButtonComponent,
    ButtonComponent,
    StandardInputComponent,
    InitialsPipe,
    TimeAgoPipe,
    PostComponent,
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
  ],
})
export class SharedModule {}
