import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from '../app-routing.module';
import { UserPanelModule } from '@features/user-panel/user-panel.module';


@NgModule({
  declarations: [
    BaseComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    UserPanelModule
  ],
  exports: [
    BaseComponent,
    MainComponent
  ]
})
export class PagesModule { }
