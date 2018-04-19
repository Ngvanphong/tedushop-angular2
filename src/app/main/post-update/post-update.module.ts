import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes,RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {DataService} from '../../core/service/data.service';
import {UploadService} from '../../core/service/upload.service';
import {ModalModule} from 'ngx-bootstrap';
import {NotificationService} from '../../core/service/notification.service';
import {UtilityService} from '../../core/service/utility.service';
import{SimpleTinyModule} from '../../share/simple-tiny/simple-tiny.module'
import { EditorModule } from '@tinymce/tinymce-angular';

import { PostUpdateComponent } from './post-update.component';

const PostUpdateRouter:Routes=[
  {path:'', redirectTo:'index/:id',pathMatch:'full'},
  {path:'index', redirectTo:'index/:id',pathMatch:'full'},
  {path:'index/:id', component:PostUpdateComponent}

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PostUpdateRouter),
    FormsModule,
    MultiselectDropdownModule,
    ModalModule.forRoot(),
    EditorModule,
    SimpleTinyModule,

  ],
  providers:[DataService, NotificationService,UploadService,UtilityService],
  declarations: [PostUpdateComponent]
})
export class PostUpdateModule { }
