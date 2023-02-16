import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppModalService } from '../modal/modal.service';
import { BasicObject, ModalDataObject } from '../models/models';
import { UserEndpoint } from '../services/UserEndpoint.service';

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
  styleUrls: ['./signup.component.css']
  
})
export class SignupComponent implements OnDestroy
{ roles=["customer","seller"]
  signUpForm = new FormGroup({
  username: new FormControl("",[Validators.required,Validators.minLength(4)]),
  userpassword: new FormControl("",[Validators.required,Validators.minLength(3)]),
  useremail: new FormControl("",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  userretypepassword: new FormControl("",[Validators.required,PasswordMatchValidator,Validators.minLength(3)]),
  userrole:new FormControl(this.roles[0])
  }
);
  httpSubscriber$!:Subscription;
  constructor(private modalService:AppModalService,private userService:UserEndpoint,private router:Router)
  {
    
  }
  
  ngOnDestroy(): void {
    if(this.httpSubscriber$!=undefined&&this.httpSubscriber$!=null)
    {
      console.log("Unsubscibing from http")
    }
  }

  submitForm()
  {
    if(this.signUpForm.valid)
    {
    let data={"name":this.signUpForm.get("username")?.value as string,"role":this.signUpForm.get("userrole")?.value as string,
    "password":this.signUpForm.get("userpassword")?.value as string,"email":this.signUpForm.get("useremail")?.value as string};
      
    this.modalService.showModal({state:"loading"});
    this.httpSubscriber$= this.userService.addUser(data).subscribe((res)=>
    { let modalObject:ModalDataObject={}
      if(res["success"])
      { 
        modalObject["showButton"]=false;
        modalObject["state"]="success";
        modalObject["title"]="Signed Up!";
        setTimeout(()=>this.router.navigateByUrl('/dashboard'),3000);
      }
      else
      {
        modalObject["showButton"]=true;
        modalObject["state"]="failure";
        modalObject["title"]=res["message"];

      }
      this.modalService.showModal(modalObject);
      
    });
    }
    else
    {
      this.modalService.showModal({state:"failure","title":"Enter valid Fields",showButton:true,buttonText:"Close"});
    }

  }


}
