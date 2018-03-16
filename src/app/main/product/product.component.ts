import { Component, OnInit, ViewChild } from '@angular/core';
import {DataService} from '../../core/service/data.service';
import{NotificationService} from '../../core/service/notification.service';
import{UploadService} from '../../core/service/upload.service';
import{UtilityService} from '../../core/service/utility.service';
import {MessageConstant} from '../../core/common/message.constant';
import{SystemConstant} from '../../core/common/system.constant';
import {ModalDirective} from 'ngx-bootstrap';
import {AuthenService} from '../../core/service/authen.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('addEditModal') private addEditModal:ModalDirective;
  @ViewChild('thumbnailImage') private thumbnailImage;
  public baseFolder:string=SystemConstant.BASE_API;
  public entity:any;
  public totalRow:number;
  public pageIndex:number=1;
  public pageSize: number = 20;
  public pageDisplay: number = 10;
  public filter: string = '';
  public filterCategoryID: number;
  public products: any[];
  public productCategories: any[];

  constructor(public _authenService: AuthenService,  private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService, private uploadService: UploadService ) {

     }

  ngOnInit() {
    this.loadProductCategories();
    this.search();
  }

  public createAlias(){
    this.entity.Alias=this.utilityService.MakeSeoTitle(this.entity.Name);
  }

  public search() {
    this._dataService.get('/api/product/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.filter + '&categoryId=' + this.filterCategoryID)
      .subscribe((response: any) => {
        this.products = response.Items;
        this.pageIndex = response.PageIndex;
      }, error => this._dataService.handleError(error));
  }

  public reset(){
    this.filter='';
    this.filterCategoryID=null;
    this.search();
  }

  public showAdd(){
    this.entity={Content:''};
    this.addEditModal.show();
  }

  public showEdit(id: string) {
    this._dataService.get('/api/product/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  private deleteConfirm(id:string){
    this._dataService.delete('/api/product/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
      this.search();
    }, error => this._dataService.handleError(error));
  }

  public delete(id:string){
    this.notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG,()=>this.deleteConfirm(id));
  }

  private loadProductCategories() {
    this._dataService.get('/api/productCategory/getallhierachy').subscribe((response: any[]) => {
      this.productCategories = response;
    }, error => this._dataService.handleError(error));
  }
  public saveChanges(valid:boolean){
    if (valid){
      let fi:any[]= this.thumbnailImage.nativeElement;
      if(fi.length>0){
        this.uploadService.postWithFile('/api/upload/saveImage?type=product',null,fi).then((imgUrl:any)=>{
          this.entity.entity.ThumbnailImage=imgUrl;
        }).then(()=>{
            this.saveData();
        })
      }
      else{
        this.saveData();
      }
    }
  }

  private saveData(){
    if(this.entity.ID==undefined){
      this._dataService.post('/api/product/add').subscribe((res:any)=>{
        this.search();
        this.addEditModal.hide();
        this.notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
      },error=>this._dataService.handleError(error));
    }
    else {
      this._dataService.put('/api/product/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.search();
        this.addEditModal.hide();
        this.notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);
      }, error => this._dataService.handleError(error));
    }
    

  }

  public pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }


}
