import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  CollectionReference,
} from '@angular/fire/firestore';
import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css'],
})
export class RegistrationformComponent implements OnInit {
  community: string = '';
  logoUrl: string = '';
  heading: string = '';
  registrationForm: FormGroup;
  shopOwners: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private firestore: Firestore,
    private route: ActivatedRoute
  ) {
    this.registrationForm = this.fb.group({
      shopName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]*$/)],
      ],
      ownerName: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
      ],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      GstNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9]Z[0-9A-Z]$/),
        ],
      ],
      district: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)],
      ],
      address: ['', Validators.required],
      pinCode: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[0-9]*$/),
        ],
      ],
      memberId: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    // Get the current URL using the router service and console it
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);

    // Set the community, logoUrl, and heading based on the URL path
    if (currentUrl.includes('mobile-shop')) {
      this.community = 'Mobile Shops';
      this.logoUrl =
        'https://img.freepik.com/free-vector/gradient-mobile-store-logo-design_23-2149697771.jpg?semt=ais_hybrid';
      this.heading = 'Mobile Shops Registration';
    } else if (currentUrl.includes('jewelry-shop')) {
      this.community = 'Jewelry Shops';
      this.logoUrl =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY9bmn8Y6kDqaw12nK59H-rJa_ZhKAl38khg&s';
      this.heading = 'Jewelry Shops Registration';
    }

    console.log('Community name: ', this.community);
  }

  async onSubmit() {
    if (this.registrationForm.valid) {
      try {
        // Use the community name as the collection name
        const docRef = await addDoc(
          collection(
            this.firestore,
            this.community.toLowerCase().replace(/\s+/g, '-')
          ),
          this.registrationForm.value
        );
        console.log('Added Document ID:', docRef.id);

        const currentUrl = this.router.url;
        console.log('Current URL:', currentUrl);

        this.router.navigate([`${currentUrl}/addproduct`], {
          queryParams: { id: docRef.id },
        });
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
