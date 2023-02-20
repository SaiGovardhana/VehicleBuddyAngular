import { Pipe, PipeTransform } from "@angular/core";
import { BasicObject } from "src/app/models/models";

@Pipe(
    {
        'name':'revenuepipe',
        'pure':false
    }
)
export class RevenueSumPipe implements PipeTransform
{
    transform(value: BasicObject[] ) 
    {
        let sum=0;

        for(let x of value)
            sum+=Number.parseInt(x["vehicleprice"]);

        return sum;

        
    }
}