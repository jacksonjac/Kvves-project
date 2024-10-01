import { Component } from '@angular/core';
import { Auth, signInWithPhoneNumber, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from '@angular/fire/auth';
import {PhoneotpService} from '../services/phoneotp.service'
@Component({
  selector: 'app-verfication',
  templateUrl: './verfication.component.html',
  styleUrls: ['./verfication.component.css']
})
export class VerficationComponent {

  phoneNumber: string = '';
  verificationId: string = '';
  otp: string = '';

  constructor(private authService: PhoneotpService) {}

 
  verifyOtp() {
    this.authService.verifyOtp(this.verificationId, this.otp)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Verification failed:', error);
      });
  }

}
