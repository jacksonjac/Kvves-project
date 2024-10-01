import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Firestore, collection, addDoc, getDocs, CollectionReference, doc } from '@angular/fire/firestore';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {

  productForm!: FormGroup;
  products: any[] = [];  // Store added products
  shopId: string = '';   // Store the passed shop ID

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute, // Inject ActivatedRoute
    private firestore: Firestore
  ) {}

  ngOnInit() {
    // Get the shop ID from query params using ActivatedRoute
    this.activatedRoute.queryParams.subscribe(params => {
      const shopId = params['id'];  // Capture the ID
      if (shopId) {
        this.shopId = shopId;
        console.log("Shop ID:", this.shopId);  // Debugging, shows the passed shop ID
      }
    });

    // Initialize product form
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      model: ['', Validators.required],
      category: ['', Validators.required],
      rate: [0, [Validators.required, Validators.min(0)]],
      customerRate: [0, [Validators.required, Validators.min(0)]],
    });
  }

  async onSubmit() {
    if (this.productForm.valid) {
      // Create a new product object that includes the shop ID
      const productData = { 
        ...this.productForm.value, 
        shopId: this.shopId  // Include the shop ID
      };
  
      // Add the new product to the products array
      this.products.push(productData);
      console.log('Product added:', productData);
  
      try {
        // Add the product data to Firestore
        const docRef = await addDoc(collection(this.firestore, 'products'), productData);
        console.log('Product document added with ID:', docRef.id);
      } catch (error) {
        console.error("Error adding product document: ", error);
      }
  
      // Reset the form for the next product entry
      this.productForm.reset();
  
      // Check if the minimum required products are added
      if (this.products.length >= 2) {
        const currentUrl = this.router.url;
        console.log("Current URL from verify:", currentUrl);
        
        // Parse the current URL to extract the community name
        const parts = currentUrl.split('/');
        const communityName = parts[2]; // Assuming the structure is /user/{community}/...
  
        // Navigate to the verify page
        this.router.navigate([`/user/${communityName}/verify`]);
      }
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.productForm.get(controlName);
    return control ? control.invalid && (control.touched || control.dirty) : false;
  }
}
