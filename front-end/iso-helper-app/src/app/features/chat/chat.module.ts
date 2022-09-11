import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPanelComponent } from './components/chat-panel/chat-panel.component';
import { UsersPanelComponent } from './components/users-panel/users-panel.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { MessageComponent } from './components/message/message.component';

import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatPanelComponent,
    UsersPanelComponent,
    MessengerComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    FormsModule
  ],
  exports: [
    ChatPanelComponent
  ]
})
export class ChatModule { }
