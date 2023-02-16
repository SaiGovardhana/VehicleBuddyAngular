import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, tap } from "rxjs";
import { BasicObject, SignUpRequestModel } from "../models/models";
import { AuthStore } from "./auth.service";

@Injectable({providedIn:"root"})
export class UserEndpoint
{
    constructor(private http:HttpClient,private authStore:AuthStore)
    {
    
    }


}