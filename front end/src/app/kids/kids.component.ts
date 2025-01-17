import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-kids',
  standalone: false,
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css'],
})
export class KidsComponent implements OnInit {
  products: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    // جلب المنتجات
    this.productsService.getProducts().subscribe((data) => {
      console.log(data);

      // التحقق من المنتجات المحذوفة
      this.products = data.filter((product: any) => !product.isDeleted);

      this.products.forEach((product) => {
        console.log(product);
        console.log(product.image); // تأكد من أن الرابط صالح
      });
    });
  }
}
