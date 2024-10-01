import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, CollectionReference } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopslist',
  templateUrl: './shopslist.component.html',
  styleUrls: ['./shopslist.component.css']
})
export class ShopslistComponent implements OnInit {
  shopOwners: any[] = [];
  totalShopOwners: number = 0; // Property to hold the count
  searchText: string = ""; // Ensure searchText is declared and initialized
  allCollectionsData: any = {}; // Object to hold data from all collections
  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit() {
    this.fetchData();
  
  }


 

  async fetchData() {
    const shopOwnersCollection: CollectionReference = collection(this.firestore, 'jewelry-shops');

    try {
      const querySnapshot = await getDocs(shopOwnersCollection);
      this.shopOwners = querySnapshot.docs.map(doc=> ({
        id: doc.id,
        ...doc.data()
      }));

      this.totalShopOwners = this.shopOwners.length; // Update total count
      console.log('Fetched Data: ', this.shopOwners);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  }

  viewShopProducts(shopId: string) {
    // Navigate to the product list page with the shop ID as a query parameter
    this.router.navigate(['/admin/products-list'], { queryParams: { id: shopId } });
  }

}
