import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable(
    {
        providedIn:'root'
    }
)
export class NavBarService
{
    private subject$:BehaviorSubject<boolean>;
    navBarVisible$:Observable<boolean>;
    constructor()
    {
        this.subject$=new BehaviorSubject(true);
        this.navBarVisible$=this.subject$.asObservable();
    }

    displayNav()
    {
        this.subject$.next(true);
    }

    hideNav()
    {
        this.subject$.next(false);
    }

}