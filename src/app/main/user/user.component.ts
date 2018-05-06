import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SystemConstant } from '../../core/common/system.constant';
import { NotificationService } from '../../core/service/notification.service';
import { UtilityService  } from '../../core/service/utility.service';
import { MessageConstant } from '../../core/common/message.constant';
import {UploadService} from '../../core/service/upload.service';
import {AuthenService} from '../../core/service/authen.service';
import {NgForm} from '@angular/forms';
declare var moment;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  
  @ViewChild('modalAddEdit') addEditModal: ModalDirective;
  @ViewChild('avatar') avatar;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filter: string = '';
  public totalRows: number;
  public entity: any;
  public users: any;
  public allRoles:any[];
  public myRoles:any[];
  public roles:any[];
  public BaseUrlImage:string=SystemConstant.BASE_API;

  constructor(private dataservice: DataService, private _notification: NotificationService ,
     private _uploadservice:UploadService,public _authenService:AuthenService,
     private _utilityService:UtilityService) {
      
      }

  ngOnInit() {
    if(this._authenService.checkAccess('USER')==false)
         this._utilityService.navigateToLogin();
    this.load();
    this.loadRole();
  }

  public selectGender(event){
    this.entity.Gender=event.target.value;
  }
  private loadRole(){
    this.dataservice.get("/api/appRole/getlistall").subscribe(data=>{
      this.roles=data;
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
public selectedDate(event:any){
  this.entity.BirthDay = moment(event.end._d).format('DD/MM/YYYY');
}
  public load() {
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
    this.entity = {Status:true};
  }
  private loadUser(id: any) {
    this.entity={};
    this.dataservice.get('/api/appUser/detail/' + id)
      .subscribe((res: any) => {
        this.entity = res;
        this.myRoles=[];
        this.entity.BirthDay=moment(this.entity.BirthDay,'MM/DD/YYYY').format('DD/MM/YYYY');
        for(let role of this.entity.Roles){
          this.myRoles.push(role);
        };
   
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

  saveChange(form:NgForm) {
    if (form.valid) {
      this.entity.Roles=this.myRoles;
      let fi=this.avatar.nativeElement;
      if(fi.files.length>0){
        this._uploadservice.postWithFile("/api/upload/saveImage?type=avatar", null, fi.files)
        .then((imageUrl:string)=>{
            this.entity.Avatar=imageUrl;
        }).then(()=>{
          this.saveData(form);
        });
      }
      else{
        this.saveData(form);
      }
    }
  }
  private saveData(form:NgForm){
    if (this.entity.Id == undefined) {
      this.dataservice.post("/api/appUser/add", JSON.stringify(this.entity)).subscribe((res: any) => {
        this.load();
        this.addEditModal.hide();
        form.resetForm();
        this.avatar.nativeElement.value='';
        this._notification.printSuccesMessage(MessageConstant.CREATE_OK_MEG);

      }, error => this.dataservice.handleError(error))
    }
    else {
      this.dataservice.put("/api/appUser/update", JSON.stringify(this.entity)).subscribe((res: any) => {
        this.load();
        this.addEditModal.hide();
        form.resetForm();
        this.avatar.nativeElement.value='';
        this._notification.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);

      }, error => this.dataservice.handleError(error))
    }
  }

}
