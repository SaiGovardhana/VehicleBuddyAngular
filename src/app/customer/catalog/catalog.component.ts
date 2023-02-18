import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { VehicleModel } from '../..//models/models';
import { VehicleEndpointService } from '../../services/VehicleEndpoint.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit,OnDestroy{

  subscription!:Subscription;
  arr!:VehicleModel[]
  state='loading'
  constructor(private vehicleService:VehicleEndpointService,private router:Router)
  {

  }

  ngOnInit()
  {  
    this.subscription=this.vehicleService.getVehicles().pipe(map(x=>x["data"] as VehicleModel[])).subscribe
    (
      x=>{this.arr=x;
      
      this.state="success";
      }
    ,(e)=>{this.state="failure"});
  }

  ngOnDestroy(): void {
    if(this.subscription!=null&&!this.subscription.closed)
      this.subscription.unsubscribe()

  }

}
