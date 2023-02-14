import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  animations:[
    trigger("showAndHide",[
      state('hide',style({"visibility":"hidden",transform:"translateX(0vw)","opacity":0})),
      state('show',style({"visibility":"visible",transform:"translateX(0vw)","opacity":1})),
      transition("* => show",[animate('0s')]),
      transition("* => hide",[animate('.9s')]),
    ])
  ]})
export class LoadingComponent implements OnInit {
  loadingVisible$!:Observable<boolean>;
  constructor(private loadingservice:LoadingService,private router:Router)
  {
    
  }
  ngOnInit(): void {
    console.log("HERE")
    this.loadingVisible$=this.loadingservice.loadingVisible$;
    this.router.events.subscribe((e)=>{
      
      if(e instanceof NavigationStart)
      { console.log("HERE Start Navigation")
        this.loadingservice.showLoading()
      }
      if( e instanceof NavigationEnd)
        { console.log("HERE Navigation End")
          setTimeout(()=>this.loadingservice.hideLoading(),1)
          
        }

    });
  }
  
}
