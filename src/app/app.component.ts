import { transition, trigger, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as ngxanimations from 'ngx-router-animations';
import { fader } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:  [
    trigger('rotateCubeToLeft',  [ transition('* <=> *', useAnimation(ngxanimations.moveFromRight))])
    ]
})
export class AppComponent {
  appname = 'Vehicle Buddy';


  getState(outlet:RouterOutlet)
  {   
    return outlet.activatedRouteData["state"];
  }
}
