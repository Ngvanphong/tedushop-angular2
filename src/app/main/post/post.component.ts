import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/service/data.service';
import { NotificationService } from '../../core/service/notification.service';
import { MessageConstant } from '../../core/common/message.constant';
import { SystemConstant } from '../../core/common/system.constant';
import { AuthenService } from '../../core/service/authen.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public baseFolder: string = SystemConstant.BASE_API;
  public totalRow: number;
  public pageIndex: number = 1;
  public pageSize: number = 10;
  public pageDisplay: number = 10;
  public posts: any[]=[];
  public postCategories: any[]
  public keyword:string='';

  constructor(public _authenService: AuthenService, private _dataService: DataService,
    private notificationService: NotificationService, private router:Router ) {

  }

  ngOnInit() {
    this.search();
  }
  public search() {
    this._dataService.get('/api/post/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize+'&keyword='+this.keyword)
      .subscribe((response: any) => {
        this.posts = response.Items;
        this.pageIndex = response.PageIndex;
        this.totalRow = response.TotalRows;
      }, error => this._dataService.handleError(error));
  }

 
public postId:number;
  public pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.search();
  }
  public GoPostAdd(){
    this.postId=this.getRandomInt(1,100000000);
    this.router.navigate(['/main/post-add/index/',this.postId ]);
  }

  private getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  private deleteConfirm(id: string) {
    this._dataService.delete('/api/post/delete', 'id', id).subscribe((response: any) => {
      this.notificationService.printSuccesMessage(MessageConstant.DELETE_OK_MEG);
      this.search();
    }, error => this._dataService.handleError(error));
  }

  public delete(id: string) {
    this.notificationService.printConfirmationDialog(MessageConstant.CONFIRM_DELETE_MEG, () => this.deleteConfirm(id));
  }

  public NavigateToUpdate(id: string) {
    this.router.navigate(['/main/post-update/index',id ]);
  }

}
