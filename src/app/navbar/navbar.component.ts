import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NavBarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations:[
    trigger("showAndHide",[
      state('hide',style({"transform":"translateY(-100px)"})),
      state('show',style({"transform":"translateY(0vh)"})),
      transition("* => show",[animate('1s cubic-bezier(0,1.06,.82,1.01)')]),
      transition("* => hide",[animate('1s cubic-bezier(0,1.06,.82,1.01)')]),
    ])
  ]})
export class NavbarComponent {
  @Input("appname")
    appname!:string
  user={name:"Govardhan",role:"default"}
  navImage="/assets/car.png";
  
  mynavService:NavBarService
  constructor(private navService:NavBarService)
  {
    this.mynavService=navService;
  } 



  

}
