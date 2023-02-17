import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { userModel } from '../models/models';
import { AuthStore } from '../services/auth.service';
import { cards } from './dashboard.data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 

  currentUser$!:Observable<userModel>;
  cards=cards
  constructor(private userAuth:AuthStore)
  {

  }

  ngOnInit()
  {
    this.currentUser$=this.userAuth.currentUser$;
  }
  
}
