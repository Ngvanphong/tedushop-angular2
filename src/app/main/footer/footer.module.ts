import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule,Routes} from'@angular/router'
import {DataService} from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {FormsModule} from '@angular/forms' ;
import { FooterComponent } from './footer.component';
import {ModalModule} from 'ngx-bootstrap';
import{SimpleTinyModule} from '../../share/simple-tiny/simple-tiny.module'
import { EditorModule } from '@tinymce/tinymce-angular';
const FooterRoute:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index',component:FooterComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(FooterRoute),
    FormsModule,
    ModalModule.forRoot(),
    EditorModule,
    SimpleTinyModule,
  ],
  providers:[
    DataService,
    NotificationService
  ],
  declarations: [FooterComponent]
})
export class FooterModule { }
