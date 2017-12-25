import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import {Routes,RouterModule} from '@angular/router'
import {DataService} from '../../core/service/data.service'

const roleRoutes:Routes=[
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'index',component:RoleComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roleRoutes)
  ],
  providers:[
    DataService
  ],
  declarations: [RoleComponent]
})
export class RoleModule { }
