import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ButtonComponent } from "./button/button.component";
import { StandardInputComponent } from "./standard-input/standard-input.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ButtonComponent, StandardInputComponent],
  imports: [CommonModule, RouterModule],
  exports: [ButtonComponent, StandardInputComponent],
})
export class SharedModuleModule {}
