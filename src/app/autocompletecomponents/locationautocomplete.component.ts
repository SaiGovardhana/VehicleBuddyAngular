import { Component, Input } from "@angular/core";
import { FormControl} from "@angular/forms";
import { debounceTime, Observable, of, OperatorFunction, switchMap } from "rxjs";
import { AutoCompleteEndpointService } from "../services/AutoCompleteEndpoint.service";


@Component({
    selector:'app-autcomplete-location',
    templateUrl:'./locationautocomplete.component.html',
    styleUrls:['./autocomplete.css']
})
export class LocationAutoCompleteComponent
{   
    @Input("locationControl")
        locationControl!:FormControl
    
    location:OperatorFunction<string,string[]>=(text$:Observable<string>)=>
    { 
       return text$.pipe(debounceTime(300)).pipe(switchMap(word=>(word.length<3)?of([]):this.autoCompleteService.getAutoCompleteLocation(word)));
    }
    constructor(private autoCompleteService:AutoCompleteEndpointService)
    {

    }
}