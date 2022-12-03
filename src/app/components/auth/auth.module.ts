import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from '@/app/app.module';
import { StandardInputComponent } from '../shared/standard-input/standard-input.component';
import { AuthComponent } from './auth.component';
import { SharedModuleModule } from '../shared/shared-module.module';

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
    SharedModuleModule
    ],
  providers: [SignUpComponent],
})
export class AuthModule { }
