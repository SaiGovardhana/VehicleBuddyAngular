import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, catchError, filter, Observable, of, tap } from "rxjs";
import { BasicObject, userModel } from "../models/models";
import { NavBarService } from "../navbar/navbar.service";



@Injectable(
    {
        providedIn:'root',
        
    }
)
export class AuthStore 
{   private subject$:BehaviorSubject<userModel>;
    currentUser$:Observable<userModel>;
    
    constructor(private http:HttpClient,private navBarService:NavBarService,private cookieService:CookieService)
    {   let defaultRole:userModel={name:"",email:"",role:"default",password:""};
        this.subject$=new BehaviorSubject(defaultRole);
        if(localStorage.getItem("userDetails")!=undefined&&localStorage.getItem("userDetails")!=null)
            {
                this.subject$.next(JSON.parse(localStorage.getItem("userDetails") as string) as userModel);
            }
        this.currentUser$=this.subject$.asObservable().pipe();
        console.log("HERE")
        this.refreshUser();
    }

    getCurrentUser():userModel
    {
        return this.subject$.value;
    }

    addUser(data:BasicObject):Observable<BasicObject>
    {
        return this.http.post<BasicObject>('/api/user/',data).pipe(catchError(
            ()=>of({"success":false,"message":"An error occurred."})
            )).pipe(tap(
                res=>{if(res["success"])
                {
                    console.log("Added user to local storage");
                    localStorage.setItem("userDetails",JSON.stringify(data));
                    data=data as userModel;
                    this.subject$.next(data);
                }
                }
            ));
            
    }

    login(data:BasicObject):Observable<BasicObject>
    {
        return this.http.post<BasicObject>('/api/user/auth/login',data).pipe(catchError(
            ()=>of({"success":false,"message":"An error occurred."})
            )).pipe(tap(
                res=>{if(res["success"])
                {
                    console.log("Added user to local storage");
                    let data=res["data"] as userModel;
                    localStorage.setItem("userDetails",JSON.stringify(res["data"]));
                    
                    this.subject$.next(data);
                }
                }
            ));
    }

    refreshUser()
    {
        return this.http.get<BasicObject>('/api/user/auth/loggedin').pipe(catchError(
            ()=>of({"success":false,"message":"An error occurred."})
            )).pipe(tap(
                res=>{res = res as BasicObject
                    if(res["success"])
                {
                    console.log("Added user to local storage");
                    let data=res["data"] as userModel;
                    localStorage.setItem("userDetails",JSON.stringify(data ));
                    this.subject$.next(data);
                    
                }
                
                }
            )).subscribe(e=>{});
    }
    
    signOut()
    {   console.log("Signing Out");
        let defaultRole:userModel={name:"",email:"",role:"default"};
        localStorage.removeItem("userDetails");
        this.subject$.next(defaultRole);
        if(this.cookieService.check('user'))
            this.cookieService.delete('user');


    }

}