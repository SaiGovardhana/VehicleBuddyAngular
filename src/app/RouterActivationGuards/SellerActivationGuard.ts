import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthStore } from "../services/auth.service";
import jwt_decode from "jwt-decode";

@Injectable(
{
    providedIn:'root'
}
)
export class SellerActivateGuard implements CanActivate
{   
    constructor(private authStore:AuthStore,private router:Router)
    {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
    {   
        return this.authStore.currentUser$.pipe(map(user=>user.role=="seller"?true:this.router.parseUrl("/dashboard")));
    }
}