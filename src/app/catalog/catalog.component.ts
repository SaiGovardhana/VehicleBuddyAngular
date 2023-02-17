import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { VehicleModel } from '../models/models';
import { VehicleEndpointService } from '../services/VehicleEndpoint.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit{

  subscription!:Subscription;
  arr!:VehicleModel[]
  state='loading'
  constructor(private vehicleService:VehicleEndpointService)
  {

  }

  ngOnInit()
  {
    this.subscription=this.vehicleService.getVehicles().pipe(map(x=>x["data"] as VehicleModel[])).subscribe
    (
      x=>{this.arr=x;
      
      this.state="success";
      }
    );
  }


}
