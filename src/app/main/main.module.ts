import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {mainRoutes} from './main.routes';
import{RouterModule} from '@angular/router';
import {UserModule} from './user/user.module';
import {SlidebarMenuComponent} from '../../app/share/slidebar-menu/slidebar-menu.component';
import {TopbarMenuComponent} from '../../app/share/topbar-menu/topbar-menu.component';
import {DataService} from '../../app/core/service/data.service';
import {SignalrService} from '../core/service/signalr.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes),


  ],
  providers:[DataService, SignalrService],
  declarations: [MainComponent,SlidebarMenuComponent,TopbarMenuComponent]
})
export class MainModule { }
