import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthStore } from 'src/app/services/auth.service';
import { VehicleEndpointService } from 'src/app/services/VehicleEndpoint.service';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit,OnDestroy{
  state="loading";
  bookings=[];
  totalBookings!:number
  pageSize=5
  curPage=1
  currentPage=[]

  httpSubscriber$!:Subscription
  constructor(private vehicleService:VehicleEndpointService,public authStore:AuthStore)
  {

  }



  ngOnInit()
  {
    this.httpSubscriber$=this.vehicleService.getCustomerBookings().subscribe(
      (data)=>
      {
        if(data["success"])
        {
          this.bookings=data["data"];
          this.totalBookings=this.bookings.length;
          this.currentPage=this.bookings.slice(0,5);
          this.curPage=1
          this.state="success"
        }
        else
        {
          this.state="failure";
        }
      }
      ,
      (e)=>this.state="failure"
    );
  }

  ngOnDestroy(): void 
  {
    if(this.httpSubscriber$!=null && !this.httpSubscriber$.closed)  
      this.httpSubscriber$.unsubscribe();
  }



  changePage()
  { console.log(this.curPage)
    this.currentPage=this.bookings.slice((this.curPage-1)*5,(this.curPage)*5);
    console.log(this.currentPage)
  }
}
