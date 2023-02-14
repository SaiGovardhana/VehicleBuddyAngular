import { Component } from "@angular/core";
import { NavBarService } from "../navbar/navbar.service";


@Component(
    {   
        selector:"app-home-component",
        templateUrl:"home.component.html",
        styleUrls:['./home.component.css']
    }
)
export class HomeComponent
{
    s=true;
    constructor(private navService:NavBarService)
    {

    }

    toggleNav()
    {
        if(this.s)
            this.navService.hideNav();
        else
            this.navService.displayNav();
        this.s=!this.s;

    }


}