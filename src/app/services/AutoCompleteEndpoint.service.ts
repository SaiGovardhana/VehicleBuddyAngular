import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { BasicObject } from "../models/models";


@Injectable({
    providedIn:'root'
})
export class AutoCompleteEndpointService
{
    constructor(private  httpService:HttpClient)
    {

    }

    getAutoCompleteModel(model:string):Observable<string[]>
    {   console.log(model)
        return this.httpService.get<BasicObject>(`/api/autocomplete/cars?carname=${model}`)
        .pipe(catchError(e=>of({data:[]}))).pipe(map(data=>(data["data"] as string[])));
        ;
    }

    getAutoCompleteLocation(location:string):Observable<string[]>
    {
        return this.httpService.get<BasicObject>(`/api/autocomplete/locations?location=${location}`)
        .pipe(catchError(e=>of({data:[]}))).pipe(map(data=>(data["data"] as string[])));
        ;
    }


}
