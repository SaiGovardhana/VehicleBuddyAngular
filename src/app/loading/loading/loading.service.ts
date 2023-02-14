import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class LoadingService
{   loadingVisible$:Observable<boolean>;
    subject$:BehaviorSubject<boolean>;
     constructor()
    {   
        this.subject$=new BehaviorSubject<boolean>(false);
        this.loadingVisible$=this.subject$.asObservable();

    }

    showLoading()
    {
        this.subject$.next(true);
    }

    hideLoading()
    {
        this.subject$.next(false);
    }
}