import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { userModel } from '../models/models';
import { AuthStore } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cards=[{
    title:"My Bookings",
    description:"See your previous and current bookings that you made",
    icon:"fa-car",
    link:"/user/bookings"
  },
  {
    title:"Profile",
    description:"Make changes to your profile. Upload pic,name .etc ",
    icon:"fa-person",
    link:"/user/profile"

  }];

  currentUser$!:Observable<userModel>;
  constructor(private userAuth:AuthStore)
  {

  }

  ngOnInit()
  {
    this.currentUser$=this.userAuth.currentUser$;
  }
  
}
