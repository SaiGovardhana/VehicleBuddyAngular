import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthStore } from "../services/auth.service";
@Injectable(
{
    providedIn:'root'
}
)
export class LoggedInActivateGuard implements CanActivate
{   
    constructor(private authStore:AuthStore)
    {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {
        return this.authStore.currentUser$.pipe(map(user=>user.role!="default"?true:false));
    }
}