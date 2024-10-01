import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../enviroment/enviroment'; // Ensure the correct path

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
 
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UserModule,
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),  // Move this to providers
    provideFirestore(() => getFirestore()),                   // Move this to providers
    provideAuth(() => getAuth()),                             // Move this to providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
