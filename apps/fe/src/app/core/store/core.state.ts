import { Action, State } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ShowNotification } from './core.actions';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@State({
  name: 'core',
  defaults: {},
})
@Injectable()
export class CoreState {

  constructor(private notification: NzNotificationService) {}


  @Action(ShowNotification)
  public onShowNotification(ctx: any, action: ShowNotification): void {
    this.notification.create(
      action.type,
      action.title,
      action.message
    );
  }


}
