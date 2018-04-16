import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCategoryComponent } from './post-category.component';
import{Routes,RouterModule} from '@angular/router'
import {DataService} from '../../core/service/data.service';
import {UtilityService} from '../../core/service/utility.service'
import {NotificationService} from '../../core/service/notification.service'
import {TreeModule} from 'angular-tree-component';
import { ModalModule } from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

const PostCatetoryRouter:Routes=[
  {path:'',redirectTo:'index', pathMatch:'full'},
  {path:'index', component:PostCategoryComponent}

]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PostCatetoryRouter),
    ModalModule.forRoot(),
    TreeModule,
    FormsModule

  ],
  providers:[
    DataService,
    NotificationService,
    UtilityService,
  ],
  declarations: [PostCategoryComponent]
})
export class PostCategoryModule { }
