import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { RegistrationformComponent } from './registrationform/registrationform.component';
import { VerficationComponent } from './verfication/verfication.component';
import { PaymentComponent } from './payment/payment.component';
import { AddproductComponent } from './addproduct/addproduct.component';


const routes: Routes = [
  { path: '', component: UserComponent,
    children:[
        {path:'',component:RegistrationformComponent},
        {path:'verify',component:VerficationComponent},
        {path:'payment',component:PaymentComponent},
        {path:'addproduct',component:AddproductComponent}
        
  

      
    ]
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
