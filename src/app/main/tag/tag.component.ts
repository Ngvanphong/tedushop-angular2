import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SystemConstant } from '../../core/common/system.constant';
import { NotificationService } from '../../core/service/notification.service'
import { MessageConstant } from '../../core/common/message.constant'


@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  @ViewChild('addEditModal') addEditModal: ModalDirective;
  public entity: any;
  public tags: any[]=[];
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  constructor(private dataservice: DataService, private _notification: NotificationService) { }

  ngOnInit() {
    this.load();
  }


  private load() {
    this.dataservice.get('/api/tag/getall?page='+this.pageIndex+'&pageSize='+this.pageSize)
      .subscribe((res: any) => {
        this.tags = res.Items;
        this.totalRow=res.TotalRows;
        this.pageIndex=res.PageIndex;     
      })
  }
  public pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.load();
  }
  addEdit() {
    this.addEditModal.show();
    this.entity = {};
  }

  deleteTag(id: any) {
    this._notification.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }
  deleteAllTagNotUse() {
    this._notification.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirmAllTagNotUse())
  }
  private deleteConfirm(id: any) {
    this.dataservice.delete("/api/tag/delete", "id", id).subscribe((res: Response) => {
      this._notification.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
      this.load();
    })
  }
  private deleteConfirmAllTagNotUse() {
    this.dataservice.deleteAllTagNotUse("/api/tag/deletealltagnotuse").subscribe((res: Response) => {
      this._notification.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
      this.load();
    })
  }

  saveChanged(valid:boolean){
    if(valid){    
        this.dataservice.post("/api/tag/add",JSON.stringify(this.entity)).subscribe((res:any)=>{
          this.load();
          this.addEditModal.hide();
          this._notification.printSuccesMessage(MessageConstant.CREATE_OK_MEG);

        },error=>this.dataservice.handleError(error))          
    }
  }

}
