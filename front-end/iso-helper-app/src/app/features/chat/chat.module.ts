import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatPanelComponent } from './components/chat-panel/chat-panel.component';
import { UsersPanelComponent } from './components/users-panel/users-panel.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { MessageComponent } from './components/message/message.component';

import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersFiltersComponent } from './components/users-filters/users-filters.component';
import { UserLastNamePipe } from './pipes/userLastName.pipe';
import { UserPlacePipe } from './pipes/userPlace.pipe';

@NgModule({
  declarations: [
    ChatPanelComponent,
    UsersPanelComponent,
    MessengerComponent,
    MessageComponent,
    UsersFiltersComponent,
    UserLastNamePipe,
    UserPlacePipe
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ChatPanelComponent
  ]
})
export class ChatModule { }
