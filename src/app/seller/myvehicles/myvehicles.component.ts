import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChildActivationStart, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { VehicleModel } from '../../models/models';
import { VehicleEndpointService } from '../../services/VehicleEndpoint.service';

@Component({
  selector: 'app-myvehicles',
  templateUrl: './myvehicles.component.html',
  styleUrls: ['./myvehicles.component.css']
})
export class MyVehiclesComponent {

  subscription!:Subscription;
  arr!:VehicleModel[]
  state='loading'
  location=""
  model=""
  constructor(private vehicleService:VehicleEndpointService,private router:Router)
  {

  }

  handleChange(event:string)
  {
    this.state=event;
    console.log("Recieved" ,event);
  }



}
