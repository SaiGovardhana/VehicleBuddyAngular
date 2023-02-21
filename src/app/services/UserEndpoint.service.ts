import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { BasicObject, SignUpRequestModel } from "../models/models";
import { AuthStore } from "./auth.service";

@Injectable({providedIn:"root"})
export class UserEndpoint
{
    constructor(private http:HttpClient,private authStore:AuthStore)
    {
    
    }

    
    getLoggedInUser():Observable<BasicObject>
    {

        return this.http.get<BasicObject>(`/api/user/${this.authStore.getCurrentUser().email}`);
    }

    updateUser(data:BasicObject):Observable<BasicObject>
    {
        return this.http.put<BasicObject>('/api/user',data).pipe(tap(res=>
            {
                if(res["success"])
                {   
                    this.authStore.refreshUser();
                }
            }
            
            ));

        
    }

}