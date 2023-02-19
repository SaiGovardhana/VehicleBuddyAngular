import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChildActivationStart, Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { VehicleModel } from '../..//models/models';
import { VehicleEndpointService } from '../../services/VehicleEndpoint.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

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
