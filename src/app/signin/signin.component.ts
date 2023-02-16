
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],

  
})
export class SigninComponent{
  signInForm=new FormGroup({
  useremail:new FormControl("",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  userpassword:new FormControl("",[Validators.required,Validators.minLength(3)])});

  constructor()
  {

  }

  submitForm()
  {
    
  }

}
