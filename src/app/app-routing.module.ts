import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './homecomponent/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const basicRoutes:Routes=[
  {path:"",pathMatch:"full",redirectTo:"home"},
  {path:"home",component:HomeComponent,pathMatch:"full",data:{state:"home"}},
  {path:"signup",component:SignupComponent,data:{state:"signup"}},
  {path:"signin",component:SigninComponent,data:{state:"signin"}}
]


const routes: Routes = [...basicRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
