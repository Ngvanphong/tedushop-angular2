import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component/dist/components/tree.component';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';
import { NotificationService } from '../../core/service/notification.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import{MessageConstant} from '../../core/common/message.constant'
@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {
  @ViewChild(TreeComponent) private treeFunction: TreeComponent
  @ViewChild('addEditModal') private addEditModal:ModalDirective;
  public _functions: any[];
  public _functionHierachy: any[];
  public filter: string = "";
  public entity:any;
  public editFlag:boolean;
  constructor(private _dataService: DataService, private utilityService: UtilityService, private _notificationService:NotificationService) { }

  ngOnInit() {
    this.search(event);
  }
 public addEdit(){
   this.entity={};
   this.addEditModal.show();
  this.editFlag=false;
 }

  public search(event) {
    this._dataService.get('/api/function/getall?filter=' + this.filter)
      .subscribe((response: any[]) => {
        this._functions = response.filter(x => x.ParentId == null);
        this._functionHierachy = this.utilityService.Unflatten(response);
      }, error => this._dataService.handleError(error));
  };
  public showEdit(id: string) {
    this._dataService.get("/api/function/detail/"+id).subscribe((res:any)=>{
      this.entity=res;
      this.editFlag=true;
      this.addEditModal.show();
    },error=>this._dataService.handleError(error))
  };

  private deleteConfirm(id:any){
    this._dataService.delete("/api/function/delete",'id',id).subscribe((res:any)=>{
      this._notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
      this.search(event);
    },error=>this._dataService.handleError(error))
  }
  public delete(id:any){
    this._notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG,()=>this.deleteConfirm(id))
  }

 public saveChanges(valid:boolean){
    if(valid){
      if(this.editFlag){
        this._dataService.put("/api/function/update",JSON.stringify(this.entity)).subscribe(res=>{
          this.addEditModal.hide();
          this._notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG)
        },error=>this._dataService.handleError(error))
      }
      else{
        this._dataService.post("/api/function/add",JSON.stringify(this.entity)).subscribe(res=>{
          this.addEditModal.hide();
          this._notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
          this.search(event);
        },error=>this._dataService.handleError(error))

      }
    }

 }


}
