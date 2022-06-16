import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { AddPostComponent } from '@features/post/components/add-post/add-post.component';
import { PostsComponent } from '@features/post/components/posts/posts.component';
import { PostItemComponent } from '@features/post/components/post-item/post-item.component';
import { PostDetailsComponent } from '@features/post/components/post-details/post-details.component';

@NgModule({
  declarations: [
    AddPostComponent,
    PostsComponent,
    PostItemComponent,
    PostDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  exports: [
    AddPostComponent,
    PostsComponent,
    PostItemComponent,
    PostDetailsComponent
  ]
})
export class PostModule { }
