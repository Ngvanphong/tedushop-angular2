import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SystemConstant } from '../../core/common/system.constant';
import { NotificationService } from '../../core/service/notification.service'
import { MessageConstant } from '../../core/common/message.constant'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('modalAddEdit') addEditModal: ModalDirective;
  public pageIndex: number = 1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public totalRows: number;
  public entity: any;
  users: any;
  public allRoles:any[];
  public myRoles:any[];
  public roles:any[];

  constructor(private dataservice: DataService, private _notification: NotificationService) { }

  ngOnInit() {
    this.load();
    this.loadRole();
  }

  public selectGender(event){
    this.entity.Gender=event.target.value;
  }
  private loadRole(){
    this.dataservice.get("/api/appRole/getlistall").subscribe(data=>{
      this.roles=data;
      console.log(data)
      this.allRoles=[];
      for(let role of this.roles){      
        this.allRoles.push({id:role.Name,name:role.Description});
      }
    })
  }

  public dateOptions: any = {
    locale: { format: 'DD-MM-YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker:true,
    drops: 'up'
};
  private load() {
    this.dataservice.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((res: any) => {
        this.users = res.Items;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRows = res.TotalRows;
      })
  }
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.load();
  }
  addEdit() {
    this.addEditModal.show();
    this.entity = {};
  }
  private loadUser(id: any) {
    this.dataservice.get('/api/appUser/detail/' + id)
      .subscribe((res: any) => {
        this.entity = res;
      })

  }
  EditUserModal(id: any) {
    this.loadUser(id);
    this.addEditModal.show();
  };
  deleteUser(id: any) {
    this._notification.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }

  private deleteConfirm(id: any) {
    this.dataservice.delete("/api/appUser/delete", "id", id).subscribe((res: Response) => {
      this._notification.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
      this.load();
    })
  }

  saveChange(valid: boolean) {
    if (valid) {
      if (this.entity.Id == undefined) {
        this.dataservice.post("/api/appUser/add", JSON.stringify(this.entity)).subscribe((res: any) => {
          this.load();
          this.addEditModal.hide();
          this._notification.printSuccesMessage(MessageConstant.CREATE_OK_MEG);

        }, error => this.dataservice.handleError(error))
      }
      else {
        this.dataservice.put("/api/appUser/update", JSON.stringify(this.entity)).subscribe((res: any) => {
          this.load();
          this.addEditModal.hide();
          this._notification.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);

        }, error => this.dataservice.handleError(error))
      }
    }
  }

}
