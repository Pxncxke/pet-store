import { Component, signal } from '@angular/core';
import { ProductDto } from './models';
import { productsList } from '../../../assets/product-list';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  productList = signal<ProductDto[]>([]);

  constructor() {
    this.getProducts();
  }

  getProducts() {
    // Simulate an API call to fetch products

    const products = productsList;

    this.productList.set(products);
  }
}
