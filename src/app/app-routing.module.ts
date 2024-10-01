import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: 'user/mobile-shop', pathMatch: 'full' },


  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },


  { path: 'user/mobile-shop', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'user/jewelry-shop', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },


  { path: '**', redirectTo: 'user/mobile-shop' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
