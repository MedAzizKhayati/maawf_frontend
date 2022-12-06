import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterButtonComponent } from './filter-button/filter-button.component';

@NgModule({
  declarations: [
    FilterButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterButtonComponent
  ]
})
export class SharedModule { }
