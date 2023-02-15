import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject, Observable } from "rxjs";
import { ModalDataObject } from "../models/models";



@Injectable({providedIn:'root'})
export class AppModalService    
{   private subject$!:BehaviorSubject<ModalDataObject>
    modalStream$!:Observable<ModalDataObject>;
    
    constructor(private modalService:NgbModal)
    {
        this.subject$=new BehaviorSubject<ModalDataObject>({"state":"none"});
        this.modalStream$=this.subject$.asObservable();
    }

    


    showModal(data:ModalDataObject)
    {
        this.subject$.next(data);
        

    }

    hideModal()
    {   if(this.modalService.hasOpenModals())
        {   this.subject$.next({"state":"none"});
            this.modalService.dismissAll();
            
        }
    }

}