import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { UtilityService } from '../../core/service/utility.service';
import { NotificationService } from '../../core/service/notification.service';
import{MessageConstant} from '../../core/common/message.constant';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  public entity:any={};

  constructor(private _dataService: DataService, private utilityService: UtilityService,
    private _notificationService:NotificationService) {

     }

  ngOnInit() {
    this.search();
  }
  public search() {
    this._dataService.get('/api/contact/getall' )
      .subscribe((response: any[]) => {
        this.entity = response;
      }, error => this._dataService.handleError(error));
  };

  public saveChanges(valid:boolean){
    if(valid){
      if(this.entity.ID!=undefined){
        this._dataService.put("/api/contact/update",JSON.stringify(this.entity)).subscribe(res=>{         
          this._notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG)
          this.search();
        },error=>this._dataService.handleError(error))
      }
      else{
        this._dataService.post("/api/contact/add",JSON.stringify(this.entity)).subscribe(res=>{
          this._notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
          this.search();
        },error=>this._dataService.handleError(error))

      }

    }
          
    }

 }


