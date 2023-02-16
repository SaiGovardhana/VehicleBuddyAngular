import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { BasicObject, SignUpRequesModel } from "../models/models";
import { AuthStore } from "./auth.service";

@Injectable({providedIn:"root"})
export class UserEndpoint
{
    constructor(private http:HttpClient,private authStore:AuthStore)
    {
    
    }

    addUser(data:SignUpRequesModel):Observable<any>
    {
        return this.http.post<BasicObject>('/api/user/',data).pipe(catchError(
            ()=>of({"success":false,"message":"An error occurred."})
            )).pipe(

                tap((res)=>{
                    if(res["success"] )
                        this.authStore.updateUser({username:data["name"],email:data["email"],role:data["role"]});
                     }));
            
    }
}