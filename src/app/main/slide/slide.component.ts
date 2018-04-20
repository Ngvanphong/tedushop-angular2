import { Component, OnInit,ViewChild  } from '@angular/core';
import { MessageConstant } from '../../core/common/message.constant';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';
import { NotificationService } from '../../core/service/notification.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {UploadService} from '../../core/service/upload.service';
import { SystemConstant } from '../../core/common/system.constant';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  @ViewChild('addEditModal') private addEditModal: ModalDirective;
  @ViewChild('image2') image2;
  public entity: any={};
  public slides:any[]=[];
  public BaseUrlImage:string=SystemConstant.BASE_API;

  constructor(private _dataService: DataService, private notificationService: NotificationService, private utilitiService: UtilityService,private _uploadservice:UploadService ) {

  }

  ngOnInit() {
    this.search();
  }

   // loadData
   public search() {
    this._dataService.get('/api/slide/getall').subscribe((res: any[]) => {
      this.slides=res;
    }, error => this._dataService.handleError(error));
  }

  public showAdd() {
    this.entity = { Status: true };
    this.addEditModal.show();
  }

  public EditSlideModal(id: string) {
    this._dataService.get('/api/slide/detail/' + id).subscribe((res: any) => {
      this.entity = res;
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  private deleteConfirm(id: string) {
    this._dataService.delete('/api/slide/delete', 'id', id).subscribe((res: any) => {
      this.notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
      this.search();
    }, error => this._dataService.handleError(error));
  }
  public deleteSlide(id: string) {
    this.notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }

  saveChanges(valid:boolean) {
    if (valid) {
      let fi=this.image2.nativeElement;
      if(fi.files.length>0){
        this._uploadservice.postWithFile("/api/upload/saveImage?type=banner", null, fi.files)
        .then((imageUrl:string)=>{
            this.entity.Image=imageUrl;
        }).then(()=>{
          this.saveData();
        });
      }
      else{
        this.saveData();
      }
    }
  }
  private saveData(){
    if (this.entity.ID == undefined) {
      this._dataService.post("/api/slide/add", JSON.stringify(this.entity)).subscribe((res: any) => {
        this.search();
        this.addEditModal.hide();     
        this.image2.nativeElement.value='';
        this.notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);

      }, error => this._dataService.handleError(error))
    }
    else {
      this._dataService.put("/api/slide/update", JSON.stringify(this.entity)).subscribe((res: any) => {
        this.search();
        this.addEditModal.hide();
        this.image2.nativeElement.value='';
        this.notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);

      }, error => this._dataService.handleError(error))
    }
  }



}
