import { Component, OnInit,ViewChild} from '@angular/core';
import {DataService} from '../../core/service/data.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SystemConstant } from '../../core/common/system.constant';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  @ViewChild('addEditModal') addEditModal: ModalDirective;
  public pageIndex:number=1;
  public pageSize:number=20;
  public pageDisplay:number=10;
  public filter:string='';
  public totalRows:number;
  public entity:any;
  roles:any;

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.load();
  }
 private load(){
    this.dataservice.get('/api/appRole/getlistpaging?page='+this.pageIndex+'&pageSize='+this.pageSize+'&filter='+this.filter)
    .subscribe((res:any)=>{
      this.roles=res.Items;
      this.pageIndex=res.PageIndex;
      this.pageSize=res.PageSize;
      this.totalRows=res.TotalRows;
      console.log(res);
    })
  }
  pageChanged(event:any):void{
      this.pageIndex=event.page;
      this.load();
  }
  addEdit(){
    this.addEditModal.show();
    this.entity={};
  }
  saveChanged(valid:boolean){
    if(valid){
      if (this.entity.Id==undefined){
        this.dataservice.post("api/appRole/add",JSON.stringify(this.entity)).subscribe((res:any)=>{
          this.load();
          this.addEditModal.hide();
        }
        )
      }
      else{

      }
    }
  }

}