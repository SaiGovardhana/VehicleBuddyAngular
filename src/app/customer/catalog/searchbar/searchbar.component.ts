import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { BasicObject } from 'src/app/models/models';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  @Input()
  locationControl!:FormControl
  @Input()
  modelControl!:FormControl


  constructor(private router:Router)
  {

  }

 
}
