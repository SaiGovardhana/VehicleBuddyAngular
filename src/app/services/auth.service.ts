import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable } from "rxjs";
import { userModel } from "../models/models";


@Injectable(
    {
        providedIn:'root'
    }
)
export class AuthStore
{   private subject$:BehaviorSubject<userModel>;
    currentUser$:Observable<userModel>;
    constructor()
    {   let defaultRole:userModel={username:"",email:"",role:"default"};
        this.subject$=new BehaviorSubject(defaultRole);
        if(localStorage.getItem("userDetails")!=undefined&&localStorage.getItem("userDetails")!=null)
            {
                this.subject$.next(JSON.parse(localStorage.getItem("userDetails") as string) as userModel);
            }
        this.currentUser$=this.subject$.asObservable().pipe();
    }
    

    updateUser(data:userModel)
    {
        console.log("Updating User");
        this.subject$.next(data);
        localStorage.setItem("userDetails",JSON.stringify(data));

    }

    signOut()
    {   console.log("Signing Out");
        let defaultRole:userModel={username:"",email:"",role:"default"};
        localStorage.removeItem("userDetails");
        this.subject$.next(defaultRole);


    }

}