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

  constructor(public _authenService: AuthenService, private _dataService: DataService,
    private notificationService: NotificationService, private router:Router ) {

  }

  ngOnInit() {
    this.search();
  }
  public search() {
    this._dataService.get('/api/post/getall?page=' + this.pageIndex + '&pageSize=' + this.pageSize)
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

}
