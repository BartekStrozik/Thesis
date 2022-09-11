import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from '@features/post/components/posts/posts.component';
import { PostDetailsComponent } from '@features/post/components/post-details/post-details.component';
import { AddPostComponent } from '@features/post/components/add-post/add-post.component';
import { LoginComponent } from '@core/authentication/components/login/login.component';
import { RegisterComponent } from '@core/authentication/components/register/register.component';
import { AccountComponent } from '@features/layout/components/account/account.component';
import { PostListComponent } from '@features/layout/components/post-list/post-list.component';
import { AllCommentsComponent } from '@features/comments/components/all-comments/all-comments.component';
import { PersonalsChangeComponent } from '@features/layout/components/personals-change/personals-change.component';
import { ChatPanelComponent } from '@features/chat/components/chat-panel/chat-panel.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailsComponent},
  { path: 'add-post', component: AddPostComponent},
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: RegisterComponent },
  { path: 'account', component: AccountComponent},
  { path: 'post-list', component: PostListComponent},
  { path: 'personals-change', component: PersonalsChangeComponent},
  { path: 'chat', component: ChatPanelComponent},
  { path: 'comments', component: AllCommentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
