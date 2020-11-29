import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from './store/store.module';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  imports: [
    CommonModule,
    StoreModule,
    NzNotificationModule,
  ],
  declarations: [],
})
export class CoreModule { }
