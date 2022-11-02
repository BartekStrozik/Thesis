import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from '@features/post/components/posts/posts.component';
import { PostDetailsComponent } from '@features/post/components/post-details/post-details.component';
import { AddPostComponent } from '@features/post/components/add-post/add-post.component';
import { LoginComponent } from '@core/authentication/components/login/login.component';
import { RegisterComponent } from '@core/authentication/components/register/register.component';
import { AccountComponent } from '@features/user-panel/components/account/account.component';
import { PostListComponent } from '@features/user-panel/components/post-list/post-list.component';
import { AllCommentsComponent } from '@features/comments/components/all-comments/all-comments.component';
import { PersonalsChangeComponent } from '@features/user-panel/components/personals-change/personals-change.component';
import { ChatPanelComponent } from '@features/chat/components/chat-panel/chat-panel.component';
import { AppComponent } from './app.component';
import { MainComponent } from '@pages/main/main.component';
import { AuthGuard } from '@core/authentication/components/auth.guard';
import { NotificationsComponent } from '@features/user-panel/components/notifications/notifications.component';
import { ProfileComponent } from '@features/chat/components/profile/profile.component';

const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'wall', component: PostsComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: PostDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]},
  //{ path: 'sign-in', component: LoginComponent },
  //{ path: 'sign-up', component: RegisterComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  { path: 'post-list', component: PostListComponent, canActivate: [AuthGuard]},
  { path: 'personals-change', component: PersonalsChangeComponent, canActivate: [AuthGuard]},
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard]},
  { path: 'profile/:userId', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'chat', component: ChatPanelComponent, canActivate: [AuthGuard]},
  { path: 'chat/:userId', component: ChatPanelComponent, canActivate: [AuthGuard]}
  //{ path: 'comments', component: AllCommentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
