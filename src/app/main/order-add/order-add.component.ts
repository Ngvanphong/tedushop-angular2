import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';

import { NotificationService } from '../../core/service/notification.service';
import { UtilityService } from '../../core/service/utility.service';
import { MessageConstant } from '../../core/common/message.constant';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  @ViewChild('addEditModal') public addEditModal: ModalDirective;
  public entity: any = { Status: true };
  public sizeId: number = null;
  public sizes: any[];
  public products: any[];
  public orderDetails: any[] = [];
  public detailEntity: any = {
    ProductID: 0,
    Quantity: 0,
    Price: 0
  };

  constructor(private utilityService: UtilityService,
    private _dataService: DataService,
    private notificationService: NotificationService) { }

  ngOnInit() {
  }
  /*Product quantity management */
  public showAddDetail() {
    this.loadSizes();
    this.loadProducts();

    this.addEditModal.show();

  }
  public loadProducts() {
    this._dataService.get('/api/product/getallparents').subscribe((response: any[]) => {
      this.products = response;
    }, error => this._dataService.handleError(error));
  }

  public loadSizes() {
    this._dataService.get('/api/productQuantity/getsizes').subscribe((response: any[]) => {
      this.sizes = response;
    }, error => this._dataService.handleError(error));
  }
  public goBack() {
    this.utilityService.navigate('/main/order/index');
  }


  //Save change for modal popup
  public saveChanges(valid: boolean) {
    if (valid) {
      this.entity.OrderDetails = this.orderDetails;
      this._dataService.post('/api/order/add', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.entity = response;
        this.notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
      }, error => this._dataService.handleError(error));

    }

  }
  public LoadPrice($event) {
    this.detailEntity.Product = this.products.find(x => x.ID == this.detailEntity.ProductID);
    this.detailEntity.Price = this.detailEntity.Product.PromotionPrice ? this.detailEntity.Product.PromotionPrice : this.detailEntity.Product.Price
  }
  public saveOrderDetail(valid: boolean) {
    if (valid) {

      this.detailEntity.Product = this.products.find(x => x.ID == this.detailEntity.ProductID);
      this.detailEntity.Size = this.sizes.find(x => x.ID == this.detailEntity.SizeId);
      let flag: boolean = true;
      for (var item of this.orderDetails) {
        if (item.ProductID == this.detailEntity.ProductID && item.SizeId == this.detailEntity.SizeId) {
          flag = false;
        }
      }
      if (flag == true) {
        this.orderDetails.push(this.detailEntity);
      }
      else {
        this.notificationService.printErrorMessage("Sản phẩm đã tồn tại")
      }

      this.detailEntity = {
        ProductID: 0,
        Quantity: 0,
        Price: 0,
      };
    }
  }

  //Action delete
  public deleteDetail(item: any) {
    for (var index = 0; index < this.orderDetails.length; index++) {
      let orderDetail = this.orderDetails[index];
      if (orderDetail.ProductID == item.ProductID
        && orderDetail.SizeId == item.SizeId) {
        this.orderDetails.splice(index, 1);
      }
    }
  }
}