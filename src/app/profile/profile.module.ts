import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { MessengerModule } from '../messenger/messenger.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProfilePageComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MessengerModule,
  ]
})
export class ProfileModule { }
