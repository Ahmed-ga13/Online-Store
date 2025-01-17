import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-women',
  standalone: false,
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css'], // تأكد من أن اسم الملف هنا هو "styleUrls" وليس "styleUrl"
})
export class WomenComponent implements OnInit {
  products: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    // جلب المنتجات
    this.productsService.getProducts().subscribe((data) => {
      console.log(data);

      // تصفية المنتجات التي لم يتم حذفها
      this.products = data.filter((product: any) => !product.isDeleted);
      console.log(this.products); // عرض المنتجات المتاحة فقط
    });
  }
}
