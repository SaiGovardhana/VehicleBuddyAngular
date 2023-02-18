import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './homecomponent/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { LoadingComponent } from './loading/loading/loading.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { SignupmodalComponent } from './signup/signupmodal/signupmodal.component';
import { SigninmodalComponent } from './signin/signinmodal/signinmodal.component';
import { CatalogComponent } from './customer/catalog/catalog.component';
import { VehiclecardsComponent } from './customer/catalog/vehiclecards/vehiclecards.component';
import { SearchbarComponent } from './customer/catalog/searchbar/searchbar.component';
import { VehiclecardsLoadingComponent } from './customer/catalog/vehiclecards/vehiclecardsloading.component';
import { AddvehicleComponent } from './seller/addvehicle/addvehicle.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { LocationAutoCompleteComponent } from './autocompletecomponents/locationautocomplete.component';
import { ModelAutoCompleteComponent } from './autocompletecomponents/modelautocomplete.component';
import { BasicmodalComponent } from './basicmodal/basicmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    LoadingComponent,
    DashboardComponent,
    SignupmodalComponent,
    SigninmodalComponent,
    CatalogComponent,
    VehiclecardsComponent,
    SearchbarComponent,
    VehiclecardsLoadingComponent,
    AddvehicleComponent,
    LocationAutoCompleteComponent,
    ModelAutoCompleteComponent,
    BasicmodalComponent
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,BrowserAnimationsModule,
    ReactiveFormsModule,NgbModule,
    HttpClientModule,ImageCropperModule
  ],
  providers: [NgbModal,NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
