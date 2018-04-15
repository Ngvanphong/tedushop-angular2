import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {AuthenService} from './authen.service';
import {SystemConstant} from '../common/system.constant';
import { Response } from '@angular/http/src/static_response';
import {NotificationService} from './notification.service';
import{MessageConstant } from '../common/message.constant';
import{UtilityService} from './utility.service';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class DataService {
  private headers:Headers;
  constructor(private _http:Http,private authentication:AuthenService, private notification:NotificationService, private utility:UtilityService) {
    this.headers=new Headers();
    this.headers.append("Content-Type","application/json")
   }
 

  get(uri:string){
    this.headers.delete("Authorization");
    this.headers.append("Authorization","Bearer "+this.authentication.getUserLogin().access_token)
    return this._http.get(SystemConstant.BASE_API+uri,{headers:this.headers}).map(this.extractData)
  };
  getString(uri:string,key:string,id:string){
    this.headers.delete("Authorization");
    this.headers.append("Authorization","Bearer "+this.authentication.getUserLogin().access_token);
    return this._http.get(SystemConstant.BASE_API+uri+"/?"+key+"="+id,{headers:this.headers}).map(this.extractData);
  };
  post(uri:string, data?: any){
    this.headers.delete("Authorization");
    this.headers.append("Authorization","Bearer "+this.authentication.getUserLogin().access_token)
    return this._http.post(SystemConstant.BASE_API+uri,data,{headers:this.headers}).map(this.extractData)
  };
  put(uri:string,data?:any){
    this.headers.delete("Authorization");
    this.headers.append("Authorization","Bearer "+this.authentication.getUserLogin().access_token)
    return this._http.put(SystemConstant.BASE_API+uri,data,{headers:this.headers}).map(this.extractData)
  };
  delete(uri:string,key:string,id:string){
    this.headers.delete("Authorization");
    this.headers.append("Authorization","Bearer "+this.authentication.getUserLogin().access_token)
    return this._http.delete(SystemConstant.BASE_API+uri+"?"+key+"="+id,{headers:this.headers}).map(this.extractData)
  };
  deleteAllTagNotUse(uri:string){
    this.headers.delete("Authorization");
    this.headers.append("Authorization","Bearer "+this.authentication.getUserLogin().access_token)
    return this._http.delete(SystemConstant.BASE_API+uri,{headers:this.headers}).map(this.extractData)
  };
  deleteWithMultiParams(uri: string, params) {
    this.headers.delete('Authorization');

    this.headers.append("Authorization", "Bearer " + this.authentication.getUserLogin().access_token);
    var paramStr: string = '';
    for (let param in params) {
      paramStr += param + "=" + params[param] + '&';
    }
    return this._http.delete(SystemConstant.BASE_API + uri + "/?" + paramStr, { headers: this.headers })
      .map(this.extractData);

  }
  postFile(uri:string,data?:any){
    let newHeaders= new Headers();
    newHeaders.append("Authorization","Bearer "+this.authentication.getUserLogin().access_token)
    return this._http.post(SystemConstant.BASE_API+uri,data,{headers:newHeaders}).map(this.extractData)
  }
  private extractData(res:Response){
   let body = res.json();
    return body||{};
  }
  public handleError(error: any) {
    if (error.status == 401) {
      localStorage.removeItem(SystemConstant.CURRENT_USER);
      this.notification.printErrorMessage(MessageConstant.LOGIN_AGAIN_MEG);
      this.utility.navigateToLogin();
    }
    else if (error.status == 403) {
      localStorage.removeItem(SystemConstant.CURRENT_USER);
      this.notification.printErrorMessage(MessageConstant.FORBIDDEN);
      this.utility.navigateToLogin();
    }
    else {
      let errMsg = JSON.parse(error._body).Message;
      this.notification.printErrorMessage(errMsg);
      return Observable.throw(errMsg);
    }


  }
}



