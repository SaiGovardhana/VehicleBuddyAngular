import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, map, Subscription, tap } from 'rxjs';
import { VehicleModel } from 'src/app/models/models';
import { VehicleEndpointService } from 'src/app/services/VehicleEndpoint.service';

@Component({
  selector: 'app-searchresults',
  templateUrl: './searchresults.component.html',
  styleUrls: ['./searchresults.component.css']
})
export class SearchresultsComponent implements OnInit,OnDestroy{
  locationControl=new FormControl();
  modelControl=new FormControl();
  formGroup=new FormGroup({"location":this.locationControl,"model":this.modelControl});
  subscription!:Subscription;
  arr!:VehicleModel[]
  state='loading'
  @Output("stateChange")
    stateEmitter= new EventEmitter<string>
  constructor(private vehicleService:VehicleEndpointService,private router:Router)
  {

  }
  ngOnInit()
  { this.formGroup.valueChanges.pipe(tap(x=>this.state="loading")).pipe(debounceTime(1000)).subscribe(x=>this.onSubmit());
    this.subscription=this.vehicleService.getVehicles({location:"",model:""}).pipe(map(x=>x["data"] as VehicleModel[])).subscribe
    (
      x=>{this.arr=x;
      
      this.state="success";
      this.stateEmitter.emit("success");
      }
    ,(e)=>{this.state="failure";this.stateEmitter.emit("failure")});
  }

  onSubmit()
  { let location=this.locationControl.value;
    let model=this.modelControl.value;
    this.state="loading";
    this.subscription=this.vehicleService.getVehicles({location:location?location:"",model:model?model:""}).pipe(map(x=>x["data"] as VehicleModel[])).subscribe
    (
      x=>{this.arr=x;
        
      this.state="success";
      this.stateEmitter.emit("success");
      }
    ,(e)=>{this.state="failure";this.stateEmitter.emit("failure")});

  }
  ngOnDestroy(): void {
    if(this.subscription!=null&&!this.subscription.closed)
      this.subscription.unsubscribe()

  }
}
