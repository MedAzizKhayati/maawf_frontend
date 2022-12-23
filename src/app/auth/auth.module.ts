import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@/app/shared/shared.module';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { StandardInputComponent } from '../shared/standard-input/standard-input.component';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AuthRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
    ],
  providers: [SignUpComponent],
})
export class AuthModule { }
