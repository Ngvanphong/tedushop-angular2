import { Component, OnInit } from '@angular/core';
import {DataService} from '../../core/service/data.service'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  public pageIndex:number=1;
  public pageSize:number=1;
  public pageDisplay:number=10;
  public filter:string='';
  public totalRows:number;
  roles:any;

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.load();
  }
 private load(){
    this.dataservice.get('/api/appRole/getlistpaging?page='+this.pageIndex+'&pageSize='+this.pageSize+'&filter='+this.filter)
    .subscribe((res:any)=>{
      this.roles=res.Items;
      this.pageIndex=res.PageIndex;
      this.pageSize=res.PageSize;
      this.totalRows=res.TotalRows;
      console.log(res);
    })
  }
  pageChanged(event:any):void{
      this.pageIndex=event.page;
      this.load();
  }

}