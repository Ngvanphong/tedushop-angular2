import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import{Routes, RouterModule} from '@angular/router'
import {PaginationModule} from 'ngx-bootstrap';
import {DataService} from '../../core/service/data.service';
import {NotificationService} from '../../core/service/notification.service';
import {FormsModule} from '@angular/forms' ;
const PostRouter:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index', component:PostComponent}
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PostRouter),
    PaginationModule,
    FormsModule

  ],
  providers:[DataService, NotificationService],
  declarations: [PostComponent]
})
export class PostModule { }
