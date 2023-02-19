import { Component, Input } from '@angular/core';
import { defaultImage } from 'src/app/defaultImage/DefaultImage';
import { VehicleModel } from 'src/app/models/models';

@Component({
  selector: 'app-seller-vehiclecards',
  templateUrl: './vehiclecards.component.html',
  styleUrls: ['./vehiclecards.component.css']
})
export class SellerVehiclecardsComponent {
@Input("vehicle")
  vehicle!:VehicleModel
  defaultImg=defaultImage
  

}
