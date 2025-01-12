import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { CartItem, CartService } from '../services/cart.service';

@Component({
  selector: 'app-singel-product',
  standalone: false,
  templateUrl: './singel-product.component.html',
  styleUrls: ['./singel-product.component.css'], // Corrected typo in styleUrls
})
export class SingelProductComponent implements OnInit {
  product: any; // يحتوي على بيانات المنتج
  selectedColor: string = ''; // اللون المحدد للمنتج
  selectedSize: string = ''; // الحجم المحدد للمنتج
  quantity: number = 1; // الكمية المحددة للمنتج

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // الحصول على ID المنتج من الـ Route
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productsService.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data;
          if (this.product?.sizes?.length) {
            this.selectedSize = this.product.sizes[0]; // تعيين أول حجم بشكل افتراضي
          }
        },
        error: (err) => {
          console.error('Error fetching product:', err);
          alert('Failed to load product details.');
        },
      });
    } else {
      console.error('Invalid product ID.');
    }
  }

  // إضافة المنتج إلى السلة
  addToCart(): void {
    if (!this.selectedColor) {
      alert('Please select a color.');
      return;
    }

    if (!this.selectedSize) {
      alert('Please select a size.');
      return;
    }

    const cartItem = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.new_price,
      quantity: this.quantity, // الكمية
      image: this.product.image,
      size: this.selectedSize, // الحجم
      color: this.selectedColor,
    };

    this.cartService.addToCart(cartItem); // إضافة المنتج إلى السلة
    alert('Product added to cart successfully!');
  }

  // تحديد اللون
  selectColor(color: string): void {
    this.selectedColor = color;
  }
}
