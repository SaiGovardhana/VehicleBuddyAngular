import { Component, ElementRef, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { BasicmodalComponent } from 'src/app/basicmodal/basicmodal.component';
import { BasicObject } from 'src/app/models/models';
import { AutoCompleteEndpointService } from 'src/app/services/AutoCompleteEndpoint.service';
import { VehicleEndpointService } from 'src/app/services/VehicleEndpoint.service';

const PostiveValidator:ValidatorFn=(control)=>
{
  return control.value<0?{"error":true}:null;
}
@Component({
  selector: 'app-addvehicle',
  templateUrl: './addvehicle.component.html',
  styleUrls: ['./addvehicle.component.css']
})
export class AddvehicleComponent implements OnDestroy {
  locationContol=new FormControl("",[Validators.required,Validators.minLength(3)])
  modelControl=new FormControl("",[Validators.required,Validators.minLength(3)])
  priceControl=new FormControl(null,[Validators.required,PostiveValidator])
  addVehicleForm=new FormGroup({"locationControl":this.locationContol,"modelControl":this.modelControl,"priceControl":this.priceControl})


  imageChangedEvent: any = '';

  //Has Base 64 url
  croppedImage: any = '';
  @ViewChild("modal")
    modal!:TemplateRef<any>;
  @ViewChild("vehicleimage",{read:ElementRef})
    vehicleImage!:ElementRef<HTMLImageElement>;
  modalRef!:NgbModalRef  ;
  @ViewChild("modalcomponent")
    modalComponent!:BasicmodalComponent
  httpSubscriber$!:Subscription;


  constructor(private modalService:NgbModal,private router:Router,private vehicleService:VehicleEndpointService)
  {

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
    this.vehicleImage.nativeElement.src=this.croppedImage;
    this.modalService.dismissAll();



  }

  submitForm()
  {
    let data:BasicObject={};
    
    
    if(this.addVehicleForm.valid)
    {
      //vehicleprice,model,location,profilepic
    data["vehicleprice"]=this.priceControl.value;
    data["profilepic"]=this.vehicleImage.nativeElement.src;
    data["location"]=this.locationContol.value;
    data["model"]=this.modelControl.value
    console.log(data);
    
    this.modalComponent.open('loading');
    this.httpSubscriber$= this.vehicleService.addVehicle(data).subscribe((res)=>
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
    {   console.log("Here");
        this.modalComponent.open("invalid");
    }

    
  }

  }
  

