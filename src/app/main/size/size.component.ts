import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SystemConstant } from '../../core/common/system.constant';
import { NotificationService } from '../../core/service/notification.service'
import { MessageConstant } from '../../core/common/message.constant'

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {
  @ViewChild('addEditModal') addEditModal: ModalDirective;
  public entity: any;
  public sizes: any;
  constructor(private dataservice: DataService, private _notification: NotificationService) { }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.dataservice.get('/api/productQuantity/getsizes')
      .subscribe((res: any) => {
        this.sizes = res;
      })
  }
  addEdit() {
    this.addEditModal.show();
    this.entity = {};
  }

  EditRoleModal(id:any){
    this.loadSize(id);
    this.addEditModal.show();
  }
  private loadSize(id:any){
    this.dataservice.get('/api/productQuantity/sizesdetail/'+id)
      .subscribe((res:any)=>{
        this.entity=res;
      })
  }

  deleteSize(id: any) {
    this._notification.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }
  private deleteConfirm(id: any) {
    this.dataservice.delete("/api/productQuantity/deletesize", "id", id).subscribe((res: Response) => {
      this._notification.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
      this.load();
    })
  }

  saveChanged(valid:boolean){
    if(valid){
      if (this.entity.ID==undefined){
        this.dataservice.post("/api/productQuantity/addsizes",JSON.stringify(this.entity)).subscribe((res:any)=>{
          this.load();
          this.addEditModal.hide();
          this._notification.printSuccesMessage(MessageConstant.CREATE_OK_MEG);

        },error=>this.dataservice.handleError(error))
      }
      else{
          this.dataservice.put("/api/productQuantity/updatesizes",JSON.stringify(this.entity)).subscribe((res:any)=>{
            this.load();
            this.addEditModal.hide();
            this._notification.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);
  
          },error=>this.dataservice.handleError(error))
      }
    }
  }


 


}
