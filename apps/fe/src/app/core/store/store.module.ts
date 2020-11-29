import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../../../environments/environment';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CoreState } from './core.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([CoreState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ name: 'hackaton' }),
    NgxsRouterPluginModule.forRoot(),
  ],
  declarations: [],
  providers: [

  ]
})
export class StoreModule { }
