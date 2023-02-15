import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AppModalService } from '../modal/modal.service';

//Validate if both passwords match
const PasswordMatchValidator:ValidatorFn=(control)=>
{ 

  const userpassword=control.parent?.get("userpassword")
  const repassword= control;
  return userpassword?.value != repassword?.value ? {"error":true} : null; 


}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],

  
})
export class SignupComponent 
{ roles=["customer","seller"]
  signUpForm = new FormGroup({
  username: new FormControl("",[Validators.required,Validators.minLength(4)]),
  userpassword: new FormControl("",[Validators.required,Validators.minLength(3)]),
  useremail: new FormControl("",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  userretypepassword: new FormControl("",[Validators.required,PasswordMatchValidator,Validators.minLength(3)]),
  userrole:new FormControl(this.roles[0])
  }
  );
  constructor(private modalService:AppModalService)
  {
    
  }
  submitForm()
  {
    console.log(this.signUpForm.get("username")?.value);
    console.log(this.signUpForm.get("userpassword")?.value);
    console.log(this.signUpForm.get("useremail")?.value);
    console.log(this.signUpForm.get("userrole")?.value);
  }


}
