import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SimpleTinyComponent} from '../../share/simple-tiny/simple-tiny.component';
import {DataService} from '../../core/service/data.service';
import {UploadService} from '../../core/service/upload.service';


@NgModule({
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SimpleTinyComponent],
  providers:[DataService, UploadService],
})
export class SimpleTinyModule { }
