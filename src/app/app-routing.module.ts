import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddvehicleComponent } from './seller/addvehicle/addvehicle.component';
import { CatalogComponent } from './customer/catalog/catalog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './homecomponent/home.component';
import { CustomerActivateGuard } from './RouterActivationGuards/CustomerActivateGuard';
import { LoggedInActivateGuard } from './RouterActivationGuards/LoggedInActivationGuard';
import { LoggedOutActivateGuard } from './RouterActivationGuards/LoggedOutActivationRoute';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import {SellerActivateGuard} from "./RouterActivationGuards/SellerActivationGuard"
import { MyVehiclesComponent } from './seller/myvehicles/myvehicles.component';
const basicRoutes:Routes=[
  {path:"",pathMatch:"full",redirectTo:"home"},
  {path:"home",component:HomeComponent,pathMatch:"full",canActivate:[LoggedOutActivateGuard]},
  {path:"signup",component:SignupComponent,canActivate:[LoggedOutActivateGuard]},
  {path:"signin",component:SigninComponent,canActivate:[LoggedOutActivateGuard]},
  {path:"dashboard",component:DashboardComponent,canActivate:[LoggedInActivateGuard]},
  {path:"user/catalog",component:CatalogComponent,canActivate:[CustomerActivateGuard]},
  {path:"seller/addvehicle",component:AddvehicleComponent,canActivate:[SellerActivateGuard]},
  {path:"seller/myvehicles",component:MyVehiclesComponent,canActivate:[SellerActivateGuard]}
]


const routes: Routes = [...basicRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
