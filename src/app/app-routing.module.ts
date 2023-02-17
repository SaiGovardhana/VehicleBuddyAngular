import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './homecomponent/home.component';
import { CustomerActivateGuard } from './RouterActivationGuards/CustomerActivateGuard';
import { LoggedInActivateGuard } from './RouterActivationGuards/LoggedInActivationGuard';
import { LoggedOutActivateGuard } from './RouterActivationGuards/LoggedOutActivationRoute';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const basicRoutes:Routes=[
  {path:"",pathMatch:"full",redirectTo:"home"},
  {path:"home",component:HomeComponent,pathMatch:"full",canActivate:[LoggedOutActivateGuard]},
  {path:"signup",component:SignupComponent,canActivate:[LoggedOutActivateGuard]},
  {path:"signin",component:SigninComponent,canActivate:[LoggedOutActivateGuard]},
  {path:"dashboard",component:DashboardComponent,canActivate:[LoggedInActivateGuard]},
  {path:"user/catalog",component:CatalogComponent,canActivate:[CustomerActivateGuard]}
]


const routes: Routes = [...basicRoutes];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
