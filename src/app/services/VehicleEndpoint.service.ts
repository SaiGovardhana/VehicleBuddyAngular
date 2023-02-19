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
    addVehicle(data:BasicObject):Observable<BasicObject>
    {

        return this.http.post("/api/vehicle/addVehicle",data);
    }
    getVehicles(data:BasicObject):Observable<BasicObject>
    {   
       return this.http.get<BasicObject>(`/api/vehicle/allVehicles?location=${data['location']}&model=${data["model"]}`);
        
    }

    getVehicle(data:string):Observable<BasicObject>
    {
        return this.http.get<BasicObject>(`/api/vehicle/getVehicle?id=${data}`);
    }
    updateVehicle(data:BasicObject):Observable<BasicObject>
    {

        return this.http.put<BasicObject>("/api/vehicle/updateVehicle",data);
    }
}