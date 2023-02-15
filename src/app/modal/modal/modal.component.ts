import { Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { ModalDataObject } from 'src/app/models/models';
import { AppModalService } from '../modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers:[]
})
export class ModalComponent implements OnInit,OnDestroy{

  dataStream$!:Observable<ModalDataObject>
  data:ModalDataObject;
  dataStreamSubscription!:Subscription;
  
  @ViewChild('modal')
    modalRef!:TemplateRef<any>
	
  
    constructor(private modalService: NgbModal,public appModalService:AppModalService)
   {  this.data={"state":"none"};
      this.dataStream$=appModalService.modalStream$
   }


   ngOnInit(): void {
    this.dataStream$=this.appModalService.modalStream$;
    this.dataStreamSubscription=this.dataStream$.subscribe
    ((data)=>{let prevState=this.data["state"];
              this.data=data;

              if(prevState=="none"&&data["state"]!="none")
              {
                console.log("Displaying Modal");
                this.open(this.modalRef);
              }
              });
   }

  ngOnDestroy(): void {
    if(this.dataStreamSubscription!=undefined)
      this.dataStreamSubscription.unsubscribe();
  }   

	open(content:TemplateRef<any>) {
    
    this.modalService.open(content,{backdrop:'static',centered:true,keyboard:false});
  }

  close()
  {
    this.appModalService.hideModal();
  }

}


