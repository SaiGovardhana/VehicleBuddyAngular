import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  locationControl=new FormControl("");
  modelControl=new FormControl("");
  
  constructor(private router:Router)
  {

  }

  submitQuery()
  {
    let location=this.locationControl.value;
    let model=this.modelControl.value;
    this.router.navigateByUrl(`/user/catalog?location=${location}&model=${model}`);
  }

}
