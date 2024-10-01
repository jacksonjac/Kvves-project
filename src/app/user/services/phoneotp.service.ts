import { Injectable } from '@angular/core';
import { Auth, signInWithPhoneNumber, RecaptchaVerifier, PhoneAuthProvider, signInWithCredential } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class PhoneotpService {

  constructor(private auth: Auth) {}

 

  verifyOtp(verificationId: string, code: string) {
    const credential = PhoneAuthProvider.credential(verificationId, code);
    return signInWithCredential(this.auth, credential);
  }
}
