import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageConstant } from '../../core/common/message.constant';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';
import { NotificationService } from '../../core/service/notification.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TreeComponent } from 'angular-tree-component';

@Component({
  selector: 'app-post-category',
  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.css']
})
export class PostCategoryComponent implements OnInit {

 
  @ViewChild(TreeComponent) private treeProductCategory: TreeComponent;
  @ViewChild('addEditModal') private addEditModal: ModalDirective;
  public filter: string = '';
  public functionId: string;
  public entity: any;
  public _postCategoryHierachy: any[];
  public _postCategories: any[];
  constructor(private _dataService: DataService, private notificationService: NotificationService, private utilitiService: UtilityService) {

  }

  ngOnInit() {
    this.search();

  }

  public createAlias(name: any) {
    this.entity.Alias = this.utilitiService.MakeSeoTitle(name);
  }
  // loadData
  public search() {
    this._dataService.get('/api/postcategory/getall').subscribe((res: any[]) => {
      this._postCategoryHierachy = this.utilitiService.Unflatten2(res);
      this._postCategories = res;
    }, error => this._dataService.handleError(error));
  }


  // show add
  public showAdd() {
    this.entity = { Status: true, HomeFlag: true };
    this.addEditModal.show();

  }
  // show Edit Form
  public showEdit(id: string) {
    this._dataService.get('/api/postcategory/detail/' + id).subscribe((res: any) => {
      this.entity = res;
      this.addEditModal.show();
    }, error => this._dataService.handleError(error));
  }

  //Delete Confirm

  private deleteConfirm(id: string) {
    this._dataService.delete('/api/postcategory/delete', 'id', id).subscribe((res: any) => {
      this.notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
      this.search();
    }, error => this._dataService.handleError(error));
  }

  //action delete

  public delete(id: string) {
    this.notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id))
  }

  //Save change for modal
  public saveChanges(valid: boolean) {
    if (valid) {
      if (this.entity.ID === undefined) {
        this._dataService.post('/api/postcategory/add', this.entity).subscribe((res: any) => {
          this.notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
          this.search();
          this.addEditModal.hide();
        }, error => this._dataService.handleError(error));
      }
      else {
        this._dataService.put('/api/postcategory/update', this.entity).subscribe((res: any) => {
          this.notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG);
          this.search();
          this.addEditModal.hide();
        }, error => this._dataService.handleError(error));
      }

    }
  }



}
