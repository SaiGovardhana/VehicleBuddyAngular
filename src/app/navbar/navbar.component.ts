import { animate, state, style, transition, trigger } from '@angular/animations';
import {  Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BasicObject, userModel } from '../models/models';
import { AuthStore } from '../services/auth.service';
import { NavBarService } from './navbar.service';

const customerNavs=[{path:"/dashboard",text:"Dashboard"},{path:"/user/catalog",text:"Book Now"},{path:"/mybookings",text:"My Bookings"}];
const sellerNavs=[{path:"/dashboard",text:"Dashboard"},{path:"/seller/addvehicle",text:"Add Vehicle"},{path:"/seller/myvehicles",text:"My Vehicles"}];
const navs:BasicObject={customer:customerNavs,seller:sellerNavs,default:null}


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
export class NavbarComponent implements OnInit {
  @Input("appname")
    appname!:string
  navs=navs
  curUser$!:Observable<userModel>;
  
  navImage="/assets/car.png";
  
  mynavService!:NavBarService
  
  constructor(private navService:NavBarService,private authStore:AuthStore,private router:Router)
  {
    
  } 
  ngOnInit(): void {
    this.mynavService=this.navService;
    this.curUser$=this.authStore.currentUser$
  }

  

  signOut()
  {
    this.authStore.signOut();
    this.router.navigateByUrl("/home")
  }
  

}
