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
    {
        this.subject$=new BehaviorSubject({username:"Govardhana",email:"govardhan@gmail.com",role:"customer"});
        this.currentUser$=this.subject$.asObservable().pipe();
    }

}