import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SimpleTinyComponent} from '../../share/simple-tiny/simple-tiny.component';

@NgModule({
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [SimpleTinyComponent],
  exports: [
    SimpleTinyComponent
]
})
export class SimpleTinyModule { }
