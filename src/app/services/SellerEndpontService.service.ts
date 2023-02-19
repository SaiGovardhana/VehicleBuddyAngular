import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, retry } from "rxjs";
import { BasicObject, VehicleModel } from "../models/models";

@Injectable({providedIn:'root'})
export class SellerEndpointService
{

    constructor(private http:HttpClient)
    {

    }

    getVehicles(data:BasicObject):Observable<BasicObject>
    {   
       return this.http.get<BasicObject>(`/api/vehicle/seller/getVehicles?location=${data['location']}&model=${data["model"]}`);
        
    }
}