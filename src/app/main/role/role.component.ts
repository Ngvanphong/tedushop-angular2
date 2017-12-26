import { Component, OnInit } from '@angular/core';
import {DataService} from '../../core/service/data.service'

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  public pageIndex:number=1;
  public pageSize:number=20;
  public pageDisplay:number=10;
  public filter:string='';
  roles:any;

  constructor(private dataservic: DataService) { }

  ngOnInit() {
    this.load();
  }
 private load(){
    this.dataservic.get('/api/appRole/getlistpaging?page='+this.pageIndex+'&pageSize='+this.pageSize+'&filter='+this.filter)
    .subscribe((res:any)=>{
      this.roles=res.Items;
    })
  }

}
