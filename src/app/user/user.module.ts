import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { VerficationComponent } from './verfication/verfication.component';
import { PaymentComponent } from './payment/payment.component';
import { AddproductComponent } from './addproduct/addproduct.component';



@NgModule({
  declarations: [
   
    UserComponent,
        RegistrationformComponent,
        VerficationComponent,
        PaymentComponent,
        AddproductComponent,
    
 
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ToastrModule
   
  ]
})
export class UserModule { }
