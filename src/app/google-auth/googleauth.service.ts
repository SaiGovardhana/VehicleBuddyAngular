import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BasicObject } from "../models/models";


@Injectable(
    {
        providedIn:'root'
    })
export class GoogleAuthService
{

    constructor(private http:HttpClient)
    {

    }

    getAuthData(code:string):Observable<BasicObject>
    {  
        return this.http.get(`/api/google/callback?code=${code}`);
    }


}