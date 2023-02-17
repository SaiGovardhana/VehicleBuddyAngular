import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, retry } from "rxjs";
import { BasicObject, VehicleModel } from "../models/models";

@Injectable({providedIn:'root'})
export class VehicleEndpointService
{

    constructor(private http:HttpClient)
    {

    }

    getVehicles():Observable<BasicObject>
    {
       return this.http.get<BasicObject>("/api/vehicle/allVehicles");
        
    }
}