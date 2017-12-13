import { Component } from '@angular/core';
import {AfterViewChecked, ElementRef} from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewChecked {
  /**
   *
   */
  constructor( private ElementReft: ElementRef) {
   
  }
  ngAfterViewChecked(){
    var s = document.createElement('script');
    s.type="text/javascript";
    s.src="../assets/js/custom.js";
    this.ElementReft.nativeElement.appendChild(s);

  }
 
}
