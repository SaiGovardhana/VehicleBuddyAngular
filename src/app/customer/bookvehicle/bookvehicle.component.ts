import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { BasicmodalComponent } from 'src/app/basicmodal/basicmodal.component';
import { defaultImage } from 'src/app/defaultImage/DefaultImage';
import { VehicleModel } from 'src/app/models/models';
import { VehicleEndpointService } from 'src/app/services/VehicleEndpoint.service';

@Component({
  selector: 'app-bookvehicle',
  templateUrl: './bookvehicle.component.html',
  styleUrls: ['./bookvehicle.component.css']
})
export class BookvehicleComponent implements OnInit,OnDestroy{
  defaultImg=defaultImage
  httpSubscriber!:Subscription
  selectedDate!:NgbDate
  state='loading'
  vehicle!:VehicleModel

  @ViewChild('modalcomponent')
    modalComponent!:BasicmodalComponent
  bookings:NgbDate[]=[]
  constructor(private modalService:NgbModal,private vehicleService:VehicleEndpointService,private router:Router,private dateParser:NgbDateParserFormatter,public ngbCalendar:NgbCalendar)
  {

  }

  ngOnInit()
  {
    let vehicleId=this.router.routerState.root.snapshot.queryParamMap.get('id');
    if(vehicleId==null)
      {
        this.state="failure";
        return;
      }
    this.httpSubscriber=this.vehicleService.getVehicle(vehicleId).subscribe
    (
      (data)=>
      {
        if(data["success"])
        {
          this.vehicle=data["data"] as VehicleModel;
          
          
          for(let x of this.vehicle.bookings)
          { console.log(x,this.dateParser.parse(x))
            let curDate=NgbDate.from((this.dateParser.parse(x) as NgbDateStruct)) as NgbDate;
            this.bookings.push(curDate);
          }
          this.state="success";
          

        }
        else
        {
          this.state="failure";
        }
      },
      (e)=>this.state="failure"
    );
  }

  ngOnDestroy(): void 
  {
    if(this.httpSubscriber!=null&&!this.httpSubscriber.closed)
      this.httpSubscriber.unsubscribe();
      
  }

  getDisabled()
{
  //console.log("Bookings",this.bookings)
  return (date:NgbDate)=>{
    
  if(this.bookings.findIndex((x=>x.equals(date)))!=-1)
  { 
    return true;
  }
  else
    return false;
  }
    

}

setSelectedDate(event:NgbDate)
{
  
  this.selectedDate=event
}

submitForm()
{
  this.modalComponent.open('loading');
  let vehicleId=this.router.routerState.root.snapshot.queryParamMap.get('id') as string;
  
  this.httpSubscriber= this.vehicleService.bookVehicle(vehicleId,this.dateParser.format(this.selectedDate)).subscribe((res)=>
  { 
    if(res["success"])
    {   
        this.modalComponent.state="success";
        this.modalComponent.message=res["message"] as string;
        setTimeout(()=>this.router.navigateByUrl("/dashboard"),1500);
    }
    else
    { this.modalComponent.message=res["message"] as string;
      this.modalComponent.state="failure";
    }
  
    
  },e=>{
    this.modalComponent.message="Network Error :(";
    this.modalComponent.state="failure";});
}

}
