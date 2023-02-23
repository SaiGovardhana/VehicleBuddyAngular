import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BasicObject, userModel } from '../models/models';
import { AuthStore } from '../services/auth.service';
import { SignupmodalComponent } from '../signup/signupmodal/signupmodal.component';
import { GoogleAuthService } from './googleauth.service';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.css']
})
export class GoogleAuthComponent implements OnInit,OnDestroy {
  @ViewChild(SignupmodalComponent)
  modalComponent!:SignupmodalComponent
  state='loading'
  httpSubscriber$!:Subscription
  roleControl=new FormControl("customer");
  user!:BasicObject
  constructor(private googleService:GoogleAuthService,private router:Router,private authStore:AuthStore)
  {

  }

  ngOnInit(): void
  { 
    let code=this.router.routerState.snapshot.root.queryParamMap.get('code');
    if(code== null)
      { this.state="failue";
        return;
      }
    this.httpSubscriber$=this.googleService.getAuthData(code).subscribe
    (
      (data)=>
      { console.log(data);
        if(data["success"])
        {
          if(data["userPresent"])
            { this.authStore.refreshUser();
              
              
              setTimeout(()=>this.router.navigateByUrl("/dashboard"),10);
            }
            else
            {
              this.state="success";
              this.router.navigate(["/googleCallBack"],{replaceUrl:true})
              this.user=data["data"] ;

            }
        }
        else
        {
          this.state="failure";
        }
      }
    );
  }

  ngOnDestroy(): void {
    if(this.httpSubscriber$!=null && !this.httpSubscriber$.closed)
      this.httpSubscriber$.unsubscribe()
  }
  submitForm()
  { this.user["role"]=this.roleControl.value;
    this.modalComponent.open('loading');
    this.httpSubscriber$= this.authStore.addGoogleUser(this.user).subscribe((res)=>
    { 
      if(res["success"])
      {   this.modalComponent.name=this.user["name"] as string;
          this.modalComponent.state="success";
          setTimeout(()=>this.router.navigateByUrl("/dashboard"),1500);
      }
      else
      {
        this.modalComponent.state="failure";
      }
    
      
    },e=>this.modalComponent.state="failure");
    

  }
}
