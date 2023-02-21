import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { BasicmodalComponent } from '../basicmodal/basicmodal.component';
import { defaultImage } from '../defaultImage/DefaultImage';
import { BasicObject, userModel } from '../models/models';
import { AuthStore } from '../services/auth.service';
import { UserEndpoint } from '../services/UserEndpoint.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  defaultImage=defaultImage
  locationContol=new FormControl("",[Validators.required,Validators.minLength(3)])

  nameControl=new FormControl("",[Validators.required])
  updateUserForm=new FormGroup({"locationControl":this.locationContol,"nameControl":this.nameControl})


  imageChangedEvent: any = '';

  //Has Base 64 url
  croppedImage: any = '';
  @ViewChild("modal")
    modal!:TemplateRef<any>;
  @ViewChild("profileimage",{read:ElementRef})
    userImage!:ElementRef<HTMLImageElement>;
  displayImage!:string
  modalRef!:NgbModalRef  ;
  @ViewChild("modalcomponent")
    modalComponent!:BasicmodalComponent
  httpSubscriber$!:Subscription;

  state="loading"

  constructor(private authStore:AuthStore,private modalService:NgbModal,private router:Router,private userService:UserEndpoint)
  {

  }
  ngOnInit(): void 
  { 
    this.httpSubscriber$=this.userService.getLoggedInUser().subscribe
    (
      (data)=>
      {
        if(data["success"])
        {
          this.state="success";
          let user:BasicObject=data["data"];
          
          console.log(user);

          this.displayImage=user["profilepic"] as string
          this.updateUserForm.setValue({locationControl:user["location"]?user["location"]:"" ,
                                        nameControl:user["name"] 
                                        
                                      });
        }
        else
        {
          this.state="failure";
        }
      },e=>{this.state='failure'}
    );
  }
  ngOnDestroy(): void {
    
    if(this.modalService.hasOpenModals() )
      {
        this.modalService.dismissAll();
        console.log("Dismiss modals");
      }
    if(this.httpSubscriber$!=null && !this.httpSubscriber$.closed)
      this.httpSubscriber$.unsubscribe();
  }
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      
      this.modalRef= this.modalService.open(this.modal,{backdrop:"static",keyboard:false})
      
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      
  }

  exitModal()
  { 
    this.modalService.dismissAll();
    
  }
  saveImage()
  {
    this.displayImage=this.croppedImage;
    this.modalService.dismissAll();



  }

  submitForm()
  {
    
    let data:BasicObject={};
    
    
    if(this.updateUserForm.valid)
    {
    
    data["profilepic"]=this.userImage.nativeElement.src;
    data["location"]=this.locationContol.value;
    data["name"]=this.nameControl.value;
    let user:userModel=this.authStore.getCurrentUser();
    data["email"]=user.email;
    this.modalComponent.open('loading');
    this.httpSubscriber$= this.userService.updateUser(data).subscribe((res)=>
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
    else
    {  
        this.modalComponent.open("invalid");
    }

    
  }

}
