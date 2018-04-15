import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from'@angular/router'
import {DataService} from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {FormsModule} from '@angular/forms' ;
import { FooterComponent } from './footer.component';
const FooterRoute:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index',component:FooterComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FooterRoute),
    FormsModule,
  ],
  providers:[
    DataService,
    NotificationService
  ],
  declarations: [FooterComponent]
})
export class FooterModule { }
