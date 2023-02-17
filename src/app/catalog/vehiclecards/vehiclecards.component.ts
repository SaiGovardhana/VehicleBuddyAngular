import { Component, Input } from '@angular/core';
import { VehicleModel } from 'src/app/models/models';

@Component({
  selector: 'app-vehiclecards',
  templateUrl: './vehiclecards.component.html',
  styleUrls: ['./vehiclecards.component.css']
})
export class VehiclecardsComponent {
@Input("vehicle")
  vehicle!:VehicleModel

}
