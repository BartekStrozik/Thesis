import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationModule } from '@core/authentication/authentication.module';
import { PostModule } from '@features/post/post.module';
import { CommentsModule } from '@features/comments/comments.module';
import { UserPanelModule } from '@features/user-panel/user-panel.module';
import { ChatModule } from '@features/chat/chat.module';
import { PagesModule } from '@pages/pages.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    PostModule,
    CommentsModule,
    UserPanelModule,
    ChatModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
