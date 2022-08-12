import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutStructureComponent } from './components/layout-structure/layout-structure.component';
import { AccountComponent } from './components/account/account.component';
import { RouterModule } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostModule } from '@features/post/post.module';
import { PersonalsChangeComponent } from './components/personals-change/personals-change.component';


@NgModule({
  declarations: [
    LayoutStructureComponent,
    AccountComponent,
    PostListComponent,
    PersonalsChangeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PostModule,
    ReactiveFormsModule
  ],
  exports: [
    LayoutStructureComponent,
    AccountComponent
  ]
})
export class LayoutModule { }