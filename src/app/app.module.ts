import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './homecomponent/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule} from "@angular/common/http";
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
import { SearchresultsComponent } from './customer/catalog/searchresults/searchresults.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MyVehiclesComponent } from './seller/myvehicles/myvehicles.component';
import { SearchresultsSellerComponent } from './seller/myvehicles/searchresults/searchresults.component';
import { SellerVehiclecardsComponent } from './seller/myvehicles/vehiclecards/vehiclecards.component';
import { UpdatevehicleComponent } from './seller/updatevehicle/updatevehicle.component';
import { BookvehicleComponent } from './customer/bookvehicle/bookvehicle.component';
import { MybookingsComponent } from './customer/mybookings/mybookings.component';
import { MyrevenueComponent } from './seller/myrevenue/myrevenue.component';
import { RevenueSumPipe } from './seller/myrevenue/RevenueSum.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    
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
    BasicmodalComponent,
    SearchresultsComponent,

    MyVehiclesComponent,
    SearchresultsSellerComponent,
    SellerVehiclecardsComponent,
    UpdatevehicleComponent,
    BookvehicleComponent,
    MybookingsComponent,
    MyrevenueComponent,
    RevenueSumPipe
  
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,BrowserAnimationsModule,
    ReactiveFormsModule,NgbModule,
    HttpClientModule,ImageCropperModule,LazyLoadImageModule
  ],
  providers: [NgbModal,NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
