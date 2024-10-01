import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { PhoneotpService } from '../services/phoneotp.service';


@Component({
  selector: 'app-verfication',
  templateUrl: './verfication.component.html',
  styleUrls: ['./verfication.component.css']
})
export class VerficationComponent {


 

  phoneNumber: string = '';
  verificationId: string = '';
  verificationCode: string = '';

  constructor(private phoneOtpService: PhoneotpService) {}

  async onSendVerificationCode() {
    try {
      console.log('Sending OTP to:', this.phoneNumber); // Log phone number
      const verificationResult: ConfirmationResult = await this.phoneOtpService.sendVerificationCode(this.phoneNumber);
      this.verificationId = verificationResult.verificationId; // Store verification ID
      console.log('Verification Result:', verificationResult); // Log verification result
    } catch (error) {
      console.error('Error during sending verification code:', error);
    }
  }

  async onVerifyCode() {
    try {
      await this.phoneOtpService.verifyCode(this.verificationId, this.verificationCode);
      console.log('Phone number verified successfully!');
    } catch (error) {
      console.error('Error during verification:', error);
    }
  }
}
