import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrimaryButtonComponent } from "./primary-button/primary-button.component";
import { StandardInputComponent } from "./standard-input/standard-input.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [PrimaryButtonComponent, StandardInputComponent],
  imports: [CommonModule, RouterModule],
  exports: [PrimaryButtonComponent, StandardInputComponent],
})
export class SharedModuleModule {}
