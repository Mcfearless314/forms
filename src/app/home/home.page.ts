import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Myservice} from "../myservice";

@Component({
  selector: 'app-home',
  //templateUrl: 'home.page.html',
  template: `
  <ion-content>

    <ion-item>
      <ion-input [formControl]="myVaiable" placeholder="enter your text here"></ion-input>
      <ion-button [disabled]="myVaiable.invalid" (click)="printTheVariable()">print the variable</ion-button>
    </ion-item>


    <ion-card *ngFor="let product of service.products" (click)="deleteItem(product)">
      <ion-toolbar><ion-title>{{product.title}}</ion-title></ion-toolbar>
<comp></comp>
    </ion-card>

  </ion-content>
  `,
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  myVaiable = new FormControl('',[Validators.required, Validators.pattern('(?:Bob|Rob|Dob|Lob)')]);

  myFormGroup = new FormGroup({
    title: this.myVaiable,

  })


  constructor(private http: HttpClient, public service: Myservice) {
    this.getData();
  }

  async printTheVariable() {
    const call = this.http.post<Product>('https://dummyjson.com/products/add', this.myFormGroup.value)
    const result = await firstValueFrom<Product>(call)
    this.service.products.push(result);
  }

  async getData() {
    const call = this.http.get<Root>('http://dummyjson.com/products', {params: {limit: 5}});
    const result = await firstValueFrom<Root>(call);
    this.service.products = result.products;
  }

  deleteItem(product: Product) {
    //pretend we're sending a delete request
    //this.http.delete('https://dummyjson.com/products/'+product.id);
    this.service.products = this.service.products.filter(removething);

    function removething(prod: Product) {
      return prod.id != product.id;
    }
  }
}

export interface Root {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

@Component({
  template: `
    <ion-card-content>
      <ion-card-subtitle>dsifdsufpidosfu</ion-card-subtitle>
    </ion-card-content>
  `,
  selector: 'comp'
})
export class MyNewComponent {

}
