import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessengerComponent } from "./messenger.component";
import { MessagesComponent } from "./messages/messages.component";
import { MessengerRoutingModule } from "./messenger-routing.module";
import { ChatsComponent } from "./chats/chats.component";
import { SharedModule } from "../shared/shared.module";
import { ChatItemComponent } from "./chats/chat/chat-item.component";
import { ChatHeadComponent } from "./messages/messages-block/messages-block.component";
import { FormsModule } from "@angular/forms";
import { ChatInputComponent } from "./messages/chat-input/chat-input.component";
import { ChatNamePipe } from "./pipes/chat-name.pipe";
import { GroupChatComponent } from './chats/create-group-chat/create-group-chat.component';
import { ChatProfilesPipe } from './pipes/chat-profiles.pipe';
import { ChatEmptyComponent } from './chats/chat-empty/chat-empty.component';
import { SkeletonComponent } from './chats/chat/skeleton/skeleton.component';
import { SettingsComponent } from './messages/settings/settings.component';
@NgModule({
  declarations: [
    MessengerComponent,
    MessagesComponent,
    ChatsComponent,
    ChatItemComponent,
    ChatHeadComponent,
    ChatInputComponent,
    ChatNamePipe,
    GroupChatComponent,
    ChatProfilesPipe,
    ChatEmptyComponent,
    SkeletonComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    FormsModule,
    SharedModule,
  ],
})
export class MessengerModule {}
