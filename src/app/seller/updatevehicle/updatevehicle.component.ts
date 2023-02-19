import { Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Subscription } from 'rxjs';
import { BasicmodalComponent } from 'src/app/basicmodal/basicmodal.component';
import { defaultImage } from 'src/app/defaultImage/DefaultImage';
import { BasicObject } from 'src/app/models/models';
import { VehicleEndpointService } from 'src/app/services/VehicleEndpoint.service';

const PostiveValidator:ValidatorFn=(control)=>
{
  return control.value<0?{"error":true}:null;
}
@Component({
  selector: 'app-updatevehicle',
  templateUrl: './updatevehicle.component.html',
  styleUrls: ['./updatevehicle.component.css']
})
export class UpdatevehicleComponent implements OnInit,OnDestroy{

  defaultImage=defaultImage
  locationContol=new FormControl("",[Validators.required,Validators.minLength(3)])
  modelControl=new FormControl("",[Validators.required,Validators.minLength(3)])
  priceControl=new FormControl(0,[Validators.required,PostiveValidator])
  addVehicleForm=new FormGroup({"locationControl":this.locationContol,"modelControl":this.modelControl,"priceControl":this.priceControl})


  imageChangedEvent: any = '';

  //Has Base 64 url
  croppedImage: any = '';
  @ViewChild("modal")
    modal!:TemplateRef<any>;
  @ViewChild("vehicleimage",{read:ElementRef})
    vehicleImage!:ElementRef<HTMLImageElement>;
  displayImage!:string
  modalRef!:NgbModalRef  ;
  @ViewChild("modalcomponent")
    modalComponent!:BasicmodalComponent
  httpSubscriber$!:Subscription;

  state="loading"

  constructor(private modalService:NgbModal,private router:Router,private vehicleService:VehicleEndpointService)
  {

  }
  ngOnInit(): void 
  { let vehicleId=this.router.routerState.snapshot.root.queryParamMap.get("id");
    this.httpSubscriber$=this.vehicleService.getVehicle(vehicleId as string).subscribe
    (
      (data)=>
      {
        if(data["success"])
        {
          this.state="success";
          let vehicle:BasicObject=data["data"];
          
          //this.vehicleImage.nativeElement.src=vehicle["pic"] as string
          this.displayImage=vehicle["pic"] as string
          this.addVehicleForm.setValue({locationControl:vehicle["location"] as string,
                                        modelControl:vehicle["fullmodel"] as string,
                                        priceControl:vehicle["vehicleprice"] as number
                                        
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
    
    
    if(this.addVehicleForm.valid)
    {
      //vehicleprice,model,location,profilepic
    data["vehicleprice"]=this.priceControl.value;
    data["profilepic"]=this.vehicleImage.nativeElement.src;
    data["location"]=this.locationContol.value;
    data["model"]=this.modelControl.value
    data["id"]=this.router.routerState.snapshot.root.queryParamMap.get("id");
    
    this.modalComponent.open('loading');
    this.httpSubscriber$= this.vehicleService.updateVehicle(data).subscribe((res)=>
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
