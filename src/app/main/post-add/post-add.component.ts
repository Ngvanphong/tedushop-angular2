import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { NotificationService } from '../../core/service/notification.service';
import { UploadService } from '../../core/service/upload.service';
import { UtilityService } from '../../core/service/utility.service';
import { MessageConstant } from '../../core/common/message.constant';
import { SystemConstant } from '../../core/common/system.constant';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthenService } from '../../core/service/authen.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {
  public baseFolder: string = SystemConstant.BASE_API;
  @ViewChild('imageinput') imageinput;
  public entity: any = {};
  public posts: any[];
  public postCategories: any[]
  private flagInitTiny: boolean = true;
  public flagShowImage: boolean = false;

  /*Image Management*/
  @ViewChild('imageManageModal') private imageManageModal: ModalDirective;
  @ViewChild('imagePath') private imagePath;
  public imageEntity: any = {};
  public postImages: any[];
  public image: any = {};
  public parama: any;

  constructor(public _authenService: AuthenService, private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService, private uploadService: UploadService, private activateRoutes: ActivatedRoute) {

  }

  ngOnInit() {
    this.loadPostCategories();
    this.entity.Content = '';
    this.parama = this.activateRoutes.params.subscribe(params => {
      this.entity.ID = params['id'];
    });
  }

  

  public createAlias(name: any) {
    this.entity.Alias = this.utilityService.MakeSeoTitle(name);
  }

  private loadPostCategories() {
    this._dataService.get('/api/postcategory/getall').subscribe((response: any[]) => {
      this.postCategories = response;
    }, error => this._dataService.handleError(error));
  }
  public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }



  public showImageManage() {

    if (this.entity.ID != null|| this.entity.ID!=undefined) {     
      this.imageEntity.PostId = this.entity.ID;
      this.flagShowImage=true;
    };
    if (this.flagShowImage) {
      this.imageManageModal.show();
      this.loadPostImage(this.imageEntity.PostId);
    }

  }
  public closePopupImage() {
    this.imageManageModal.hide();
  }
  public goBack() {
    tinymce.activeEditor.remove();
    this.utilityService.navigate('/main/post/index');
  }

  public savePostImage(valid: boolean) {
    if (valid) {
      var fi = this.imagePath.nativeElement;
      if (fi.files.length > 0) {
        this.uploadService.postWithFile('/api/upload/saveimage?type=news', null, fi.files).then((imageUrl) => {
          this.imageEntity.Path = imageUrl;
          this._dataService.post('/api/postimage/add', JSON.stringify(this.imageEntity)).subscribe((res) => {
            this.notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
            this.imagePath.nativeElement.value = '';
            this.imageEntity.Caption = '';
            this.loadPostImage(this.imageEntity.PostId);
          })
        })
      }

    }
  }

  private loadPostImage(id: number) {
    this._dataService.get('/api/postimage/getall?postId=' + id).subscribe((res) => {
      this.postImages = res;
    }, error => this._dataService.handleError(error));
  }

  public deleteImage(imageId: string) {
    this.notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/postImage/delete', 'id', imageId.toString()).subscribe((res) => {
        this.notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        this.loadPostImage(this.imageEntity.PostId);
      }, error => this._dataService.handleError(error));
    })

  }



  saveChanges(valid: boolean) {
    if (valid) {
      let fi = this.imageinput.nativeElement;
      if (fi.files.length > 0) {
        this.uploadService.postWithFile("/api/upload/saveimage?type=news", null, fi.files)
          .then((imageUrl: string) => {
            this.entity.Image = imageUrl;
          }).then(() => {
            this.saveData(valid);
          });
      }
      else {
        this.saveData(valid);
      }
    }
  }
  private saveData(valid: boolean) {
    this._dataService.post("/api/post/add", JSON.stringify(this.entity)).subscribe((res: any) => {
      this.imageinput.nativeElement.value = '';
      this.notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG); 
      this.goBack();  
    }, error => this._dataService.handleError(error))

  }








}
