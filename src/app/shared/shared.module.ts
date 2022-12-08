import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilterButtonComponent } from "./filter-button/filter-button.component";
import { HeroIconModule, allIcons } from "ng-heroicon";

@NgModule({
  declarations: [FilterButtonComponent],
  imports: [
    CommonModule,
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
  exports: [FilterButtonComponent, HeroIconModule],
})
export class SharedModule {}
