import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot, Router} from '@angular/router';
import {Injectable}  from '@angular/core';
import {AuthenService} from '../service/authen.service';
import {UrlConstant} from '../common/url.constant'
import{SystemConstant} from '../common/system.constant'
@Injectable()
export class AuthGuard implements CanActivate{

        constructor(private _authenservice:AuthenService,private router: Router) {

        }
        canActivate(activateRoute:ActivatedRouteSnapshot, routerState:RouterStateSnapshot){
            if (localStorage.getItem(SystemConstant.CURRENT_USER)){
                return true
            }
            else{
                this.router.navigate([UrlConstant.lOGIN],{queryParams:{
                    returnUrl:routerState.url
                }});
                return false;
            }
        }

}
