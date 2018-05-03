import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SystemConstant } from '../../core/common/system.constant';
import { NotificationService } from '../../core/service/notification.service';
import { MessageConstant } from '../../core/common/message.constant';

@Component({
  selector: 'app-systemconfig',
  templateUrl: './systemconfig.component.html',
  styleUrls: ['./systemconfig.component.css']
})
export class SystemconfigComponent implements OnInit {
  public systemconfigs:any[];
  @ViewChild('addEditModal') addEditModal: ModalDirective;
  public entity: any;

  constructor(private dataservice: DataService, private _notification: NotificationService) { }

  ngOnInit() {
    this.load();
  }

  private load() {
    this.dataservice.get('/api/systemconfig/getall')
      .subscribe((res: any) => {
        this.systemconfigs= res;
      })
  }

  addEdit() {
    this.addEditModal.show();
    this.entity = {};
  }

  EditSystemconfigModal(id:any){
    this.loadSystemconfig(id);
    this.addEditModal.show();
  }

  private loadSystemconfig(id:any){
    this.dataservice.get('/api/systemconfig/detail/'+id)
      .subscribe((res:any)=>{
        this.entity=res;
      })
  }

  deleteSystemconfig(id: any) {
    this._notification.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }
  private deleteConfirm(id: any) {
    this.dataservice.delete("/api/systemconfig/delete", "id", id).subscribe((res: Response) => {
      this._notification.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
      this.load();
    })
  }

  saveChanged(valid:boolean){
    if(valid){
      if (this.entity.ID==undefined){
        this.dataservice.post("/api/systemconfig/add",JSON.stringify(this.entity)).subscribe((res:any)=>{
          this.load();
          this.addEditModal.hide();
          this._notification.printSuccesMessage(MessageConstant.CREATE_OK_MEG);

        },error=>this.dataservice.handleError(error))
      }
      else{
          this.dataservice.put("/api/systemconfig/update",JSON.stringify(this.entity)).subscribe((res:any)=>{
            this.load();
            this.addEditModal.hide();
            this._notification.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);
  
          },error=>this.dataservice.handleError(error))
      }
    }
  }





}
