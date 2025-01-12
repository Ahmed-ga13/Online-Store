import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-women',
  standalone: false,

  templateUrl: './women.component.html',
  styleUrl: './women.component.css',
})
export class WomenComponent implements OnInit {
  products: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    // جلب المنتجات
    this.productsService.getProducts().subscribe((data) => {
      console.log(data);

      this.products = data;
      this.products.forEach((product) => {
        console.log(product);
        console.log(product.image); // تأكد من أن الرابط صالح
      });
    });
  }
}
