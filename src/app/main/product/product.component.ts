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


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('addEditModal') private addEditModal: ModalDirective;
  public baseFolder: string = SystemConstant.BASE_API;
  public entity: any;
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public filterKeyword: string = '';
  public filterCategoryID: number = null;
  public filterHotPromotion: string = "";
  public products: any[];
  public productCategories: any[]
  public checkedItems: any[] = [];
  private flagInitTiny: boolean = true;
  /*Image Management*/
  @ViewChild('imageManageModal') private imageManageModal: ModalDirective;
  @ViewChild('imagePath') private imagePath;
  public imageEntity: any = {};
  public productImages: any[];
  public image: any = {};
  /*Quantity Management*/
  @ViewChild('quantityManageModal') private quantityManageModal: ModalDirective;
  public quantityEntity: any = {};
  public productQuantities: any[];
  public sizeId: number = null;
  public sizes: any[];

  

  constructor(public _authenService: AuthenService, private _dataService: DataService,
    private notificationService: NotificationService,
    private utilityService: UtilityService, private uploadService: UploadService) {

  }

  ngOnInit() {
    this.loadProductCategories();
    this.search();
    this.addEditModal.hide()  
  }

  public createAlias(name: any) {
    this.entity.Alias = this.utilityService.MakeSeoTitle(name);
  }

  public search() {
    this._dataService.get('/api/product/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&keyword=' + this.filterKeyword + '&categoryId='
      + this.filterCategoryID + '&filterHotPromotion=' + this.filterHotPromotion)
      .subscribe((response: any) => {
        this.products = response.Items;
        this.pageIndex = response.PageIndex;
        this.totalRow = response.TotalRows;
      }, error => this._dataService.handleError(error));
  }
  public reset() {
    this.filterKeyword = '';
    this.filterHotPromotion = '';
    this.filterCategoryID = null;
    this.search();
  }
  public showAdd() {
    this.entity = { Content: '' ,Status:true};
    if (this.flagInitTiny) {
      tinymce.on('init', () => {
      });
      this.flagInitTiny = false;
    }
    else {
      tinymce.activeEditor.setContent('');
    }
    this.addEditModal.show();
  }
  public showEdit(id: string) {
    this._dataService.get('/api/product/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      if (this.flagInitTiny) {
        tinymce.on('init', () => {
        });
        this.flagInitTiny = false;
      }
      else {
        tinymce.activeEditor.setContent(this.entity.Content)
      }
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  private deleteConfirm(id: string) {
    this._dataService.delete('/api/product/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
      this.search();
    }, error => this._dataService.handleError(error));
  }

  public delete(id: string) {
    this.notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id));
  }

  private loadProductCategories() {
    this._dataService.get('/api/productCategory/getallhierachy').subscribe((response: any[]) => {
      this.productCategories = response;
    }, error => this._dataService.handleError(error));
  }


  public saveChanges(form: NgForm) {
    if(form.valid==true){
      if (this.entity.ID == undefined) {
        this._dataService.post('/api/product/add', JSON.stringify(this.entity)).subscribe((res: any) => {
          this.search();
          this.addEditModal.hide();
          this.notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
          form.resetForm();
        }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/product/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.search();
          this.addEditModal.hide();
          this.notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);
          form.resetForm();
        }, error => this._dataService.handleError(error));
      }
    }
    


  }
 

  public pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }

  public keyupHandlerContentFunction(e: any) {
    this.entity.Content = e;
  }

  public deleteMulti() {
    this.checkedItems = this.products.filter(x => x.Checked == true);
    let checkedIds: any[] = [];
    for (var i = 0; i < this.checkedItems.length; ++i) {
      checkedIds.push(this.checkedItems[i]["ID"]);
    };
    this.notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/product/deletemulti', 'checkedProducts', JSON.stringify(checkedIds)).subscribe((res) => {
        this.notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        this.search();
      }, error => this._dataService.handleError(error));
    });
  }

  /*Imange Management*/
  public showImageManage(id: any) {
    this.imageEntity = {
      ProductId: id
    };
    this.loadProductImage(id);
    this.imageManageModal.show();

  };
  private loadProductImage(id: any) {
    this._dataService.get('/api/productImage/getall?productId=' + id).subscribe((res) => {
      this.productImages = res;
    }, error => this._dataService.handleError(error));
  }

  public saveProductImage(valid: boolean) {
    if (valid) {
      var fi = this.imagePath.nativeElement;
      if (fi.files.length > 0) {
        this.uploadService.postWithFile('/api/upload/saveImage?type=product', null, fi.files).then((imageUrl) => {
          this.imageEntity.Path = imageUrl;
          this._dataService.post('/api/productImage/add', JSON.stringify(this.imageEntity)).subscribe((res) => {
            this.notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
            this.imagePath.nativeElement.value = '';
            this.loadProductImage(this.imageEntity.ProductId);
            this.imageEntity.Caption = '';
          })
        })
      }

    }
  }
  public deleteImage(imageId: string) {
    this.notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.delete('/api/productImage/delete', 'id', imageId.toString()).subscribe((res) => {
        this.notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        this.loadProductImage(this.imageEntity.ProductId);
      }, error => this._dataService.handleError(error));
    })

  }
  private thumbnailImage() {
    this._dataService.put('/api/product/thumnailImage?productId=' + this.imageEntity.ProductId).subscribe((res) => {
      this.search();
    }, error => this._dataService.handleError(error));
  }
  public closePopupImage(){
    this.thumbnailImage();
    this.imageManageModal.hide();
  }
  /* Code method API put image for product flow ImageId */

  public updateImage(imageId: any, caption: any) {
    for (let item of this.productImages) {
      if (item.ID == imageId) {
        this.image = item;
        this.image.Caption = caption;
      }
    }
    this._dataService.put('/api/productImage/update', JSON.stringify(this.image)).subscribe((res) => {
      this.notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);
    },error=>this._dataService.handleError(error));

  }

  /*Quantity management */


  private loadSizes() {
    this._dataService.get('/api/productQuantity/getsizes').subscribe((res) => {
      this.sizes = res;
    }, error => this._dataService.handleError(error));
  }
  private loadProductQuatity(id: any) {
    this._dataService.get('/api/productQuantity/getall?productId=' + id + '&sizeId=' + this.sizeId).subscribe((res) => {
      this.productQuantities = res;
    }, error => this._dataService.handleError(error));
  }

  public showQuantityManage(productId: any) {
    this.quantityEntity = {
      ProductId: productId,
    }
    this.loadSizes();
    this.loadProductQuatity(productId);
    this.quantityManageModal.show();

  }

  public saveProductQuantity(valid: boolean) {
    this._dataService.post('/api/productQuantity/add', JSON.stringify(this.quantityEntity)).subscribe(res => {
      this.loadProductQuatity(this.quantityEntity.ProductId);
      this.quantityEntity = {
        ProductId: this.quantityEntity.ProductId,
      }
      this.notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
    }, error => this._dataService.handleError(error));
  }

  public deleteQuantity(productId: any, sizeId: any) {
    let prama: any = {
      "productId": productId, "sizeId": sizeId,
    }
    this.notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => {
      this._dataService.deleteWithMultiParams('/api/productQuantity/delete', prama).subscribe((res) => {
        this.notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
        this.loadProductQuatity(productId);
      }, error => this._dataService.handleError(error));
    })
  }

  /* Create API update quatity for product*/
  public item: any = {}
  public updateQuantity(productId: any, sizeId: number, count: any) {
    let prama: any = {
      "productId": productId, "sizeId": sizeId,
    }
    for (let item of this.productQuantities) {
      if (item.SizeId == sizeId) {
        this.item = item;
        this.item.Quantity = Number.parseInt(count);
      };
    }
    this._dataService.put('/api/productQuantity/update', JSON.stringify(this.item)).subscribe((res) => {
      this.notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);
    })

  }



}
