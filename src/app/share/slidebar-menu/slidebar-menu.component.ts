import { Component, OnInit } from '@angular/core';
import {DataService} from '../../core/service/data.service'
@Component({
  selector: 'app-slidebar-menu',
  templateUrl: './slidebar-menu.component.html',
  styleUrls: ['./slidebar-menu.component.css']
})
export class SlidebarMenuComponent implements OnInit {
public functions:any[];
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.get('/api/function/getlisthierarchy').subscribe((response: any[]) => {
      this.functions = response.sort((n1, n2) => {
        if (n1.DisplayOrder > n2.DisplayOrder)
          return 1;
        else if (n1.DisplayOrder < n2.DisplayOrder)
          return -1;
        return 0;
      });
    }, error => this.dataService.handleError(error));
  }

}
