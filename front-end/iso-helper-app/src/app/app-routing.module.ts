import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from '@features/post/components/posts/posts.component';
import { PostDetailsComponent } from '@features/post/components/post-details/post-details.component';
import { AddPostComponent } from '@features/post/components/add-post/add-post.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailsComponent},
  { path: 'add-post', component: AddPostComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
