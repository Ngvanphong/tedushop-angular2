import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SystemConstant } from '../../core/common/system.constant';
import { NotificationService } from '../../core/service/notification.service'
import { MessageConstant } from '../../core/common/message.constant'
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ViewChild('addEditModal') addEditModal: ModalDirective;
  public footer: any={};
  public flag:boolean=true;
  private flagInitTiny: boolean = true;
  constructor(private dataService:DataService, private notificationService:NotificationService) { }

  ngOnInit() {
    this.load();
    this.footer.Content='';
  }

  private load() {
    this.dataService.get('/api/footer/getall').subscribe((res: any) => {
        this.footer=res;       
      })
  }

  addEdit() {
    this.flag=true;
    this.addEditModal.show();
  }

  EditFooter(id:string){
    this.flag=false;
      tinymce.activeEditor.setContent(this.footer.Content)
    this.addEditModal.show();
  }

  public keyupHandlerContentFooter(e: any) {
    this.footer.Content = e;
  }


  public saveChanges(valid:boolean){
    if(valid){
      if(this.flag==false){
        this.dataService.put("/api/footer/update",JSON.stringify(this.footer)).subscribe(res=>{
          this.addEditModal.hide();
          this.notificationService.printSuccesMessage(MessageConstant.UPDATE_OK_MEG)
          this.load();
        },error=>this.dataService.handleError(error))
      }
      else{
        this.dataService.post("/api/footer/add",JSON.stringify(this.footer)).subscribe(res=>{
          this.addEditModal.hide();
          this.notificationService.printSuccesMessage(MessageConstant.CREATE_OK_MEG);
          this.load();
        },error=>this.dataService.handleError(error))

      }
    }

 }

}
