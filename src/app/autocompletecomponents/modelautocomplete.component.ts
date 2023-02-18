import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { debounceTime, Observable, of, OperatorFunction, switchMap } from "rxjs";
import { AutoCompleteEndpointService } from "../services/AutoCompleteEndpoint.service";


@Component({
    selector:'app-autocomplete-model',
    templateUrl:'./modelautocomplete.component.html',
    styleUrls:['./autocomplete.css']
})
export class ModelAutoCompleteComponent
{
    @Input("modelControl")
        modelControl!:FormControl
        
    model:OperatorFunction<string,string[]>=(text$:Observable<string>)=>
    { 
       return text$.pipe(debounceTime(1000)).pipe(switchMap(word=>(word.length<3)?of([]):this.autoCompleteService.getAutoCompleteModel(word)));
    }
    constructor(private autoCompleteService:AutoCompleteEndpointService)
    {

    }
}