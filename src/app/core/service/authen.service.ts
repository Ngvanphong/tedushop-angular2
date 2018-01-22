import { Injectable } from '@angular/core';
import{Http, Headers,RequestOptions,Response} from '@angular/http'
import {SystemConstant} from '../common/system.constant'
import 'rxjs/add/operator/map'
import {LoggedInUser} from '../domain/loggedin.user'

@Injectable()
export class AuthenService {
  constructor(private _http:Http) { }
  login(userName:string,password:string){
    let body= "username="+encodeURIComponent(userName)+"&password="+encodeURIComponent(password)
    +"&grant_type=password";
    let headers=new Headers();
    headers.append("Content-Type","application/x-www-form-urlencoded");
    let option=new RequestOptions({headers:headers});
    return this._http.post(SystemConstant.BASE_API+'/api/oauth/token',body,option).map((response:Response)=>{
        let user:LoggedInUser= response.json();
        if (user && user.access_token){
          localStorage.removeItem(SystemConstant.CURRENT_USER);
          localStorage.setItem(SystemConstant.CURRENT_USER,JSON.stringify(user));
        }
    })
  };
  logout(){
   localStorage.removeItem(SystemConstant.CURRENT_USER);
  }
  isUserAuthenticated():boolean{
    let user=localStorage.getItem(SystemConstant.CURRENT_USER);
    if (user!=null)
     {return true} 
     else
      return false; 
  };
  getUserLogin():LoggedInUser{
   let user: LoggedInUser;
   if (this.isUserAuthenticated()==true){
     var UserData= JSON.parse(localStorage.getItem(SystemConstant.CURRENT_USER));
     user=new LoggedInUser(UserData.access_token,UserData.username,UserData.fullName,
      UserData.email,UserData.avatar,UserData.roles,UserData.permissions);
   }
   else 
   user=null;
   return user;
  }

  checkAccess(functionId: string) {
    var user = this.getUserLogin();
    var result: boolean = false;
    var permission: any[] = JSON.parse(user.permissions);
    var roles: any[] = JSON.parse(user.roles);
    var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanRead == true);
    if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1) {
      return true;
    }
    else
      return false;
  }
  hasPermission(functionId: string, action: string): boolean {
    var user = this.getUserLogin();
    var result: boolean = false;
    var permission: any[] = JSON.parse(user.permissions);
    var roles: any[] = JSON.parse(user.roles);
    switch (action) {
      case 'create':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanCreate == true);
        if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
          result = true;
        break;
      case 'update':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanUpdate == true);
        if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
          result = true;
        break;
      case 'delete':
        var hasPermission: number = permission.findIndex(x => x.FunctionId == functionId && x.CanDelete == true);
        if (hasPermission != -1 || roles.findIndex(x => x == "Admin") != -1)
          result = true;
        break;
    }
    return result;
  }


}
