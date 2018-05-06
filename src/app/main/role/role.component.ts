import { Component, OnInit,ViewChild} from '@angular/core';
import {DataService} from '../../core/service/data.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SystemConstant } from '../../core/common/system.constant';
import {NotificationService} from '../../core/service/notification.service'
import {MessageConstant} from '../../core/common/message.constant'
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

  constructor(private dataservice: DataService, private _notification:NotificationService) { }

  ngOnInit() {
    this.load();
  }
 public load(){
    this.dataservice.get('/api/appRole/getlistpaging?page='+this.pageIndex+'&pageSize='+this.pageSize+'&filter='+this.filter)
    .subscribe((res:any)=>{
      this.roles=res.Items;
      this.pageIndex=res.PageIndex;
      this.pageSize=res.PageSize;
      this.totalRows=res.TotalRows;

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
 private loadRole(id:any){
  this.dataservice.get('/api/appRole/detail/'+id)
    .subscribe((res:any)=>{
      this.entity=res;
    })
}
  EditRoleModal(id:any){
    this.loadRole(id);
    this.addEditModal.show();
  };
  deleteRole(id:any){
    this._notification.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG,()=>this.deleteConfirm(id))
  }

  private deleteConfirm(id:any){
         this.dataservice.delete("/api/appRole/delete","id",id).subscribe((res:Response)=>{
        this._notification.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        this.load();     
      })
  }

  saveChanged(valid:boolean){
    if(valid){
      if (this.entity.Id==undefined){
        this.dataservice.post("/api/appRole/add",JSON.stringify(this.entity)).subscribe((res:any)=>{
          this.load();
          this.addEditModal.hide();
          this._notification.printSuccesMessage(MessageConstant.CREATE_OK_MEG);

        },error=>this.dataservice.handleError(error))
      }
      else{
          this.dataservice.put("/api/appRole/update",JSON.stringify(this.entity)).subscribe((res:any)=>{
            this.load();
            this.addEditModal.hide();
            this._notification.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);
  
          },error=>this.dataservice.handleError(error))
      }
    }
  }

}