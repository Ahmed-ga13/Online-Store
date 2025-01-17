import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private orderUrl = 'http://localhost:3000/orders';
  private cartItems: CartItem[] = [];

  // BehaviorSubject لإدارة عدد العناصر
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private _http: HttpClient) {
    // تحميل السلة من localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = savedCart;
    this.updateCartCount(); // تحديث العدد الإجمالي
  }

  // إضافة منتج إلى السلة
  addToCart(item: CartItem): void {
    const existingItemIndex = this.cartItems.findIndex(
      (product) =>
        product.id === item.id &&
        product.size === item.size &&
        product.color === item.color
    );

    if (existingItemIndex >= 0) {
      this.cartItems[existingItemIndex].quantity += item.quantity; // تحديث الكمية
    } else {
      this.cartItems.push(item);
    }

    this.saveCart(); // حفظ السلة بعد التعديل
    this.updateCartCount(); // تحديث العدد الإجمالي
  }

  // جلب المنتجات في السلة
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // حذف منتج من السلة
  removeFromCart(item: CartItem): void {
    const index = this.cartItems.findIndex(
      (product) =>
        product.id === item.id &&
        product.size === item.size &&
        product.color === item.color
    );

    if (index >= 0) {
      this.cartItems.splice(index, 1); // إزالة المنتج من السلة
      this.saveCart(); // تحديث السلة في الـ localStorage بعد الحذف
      this.updateCartCount(); // تحديث العدد الإجمالي
    }
  }

  // مسح السلة
  // clearCart(): void {
  //   this.cartItems = [];
  //   this.saveCart();
  //   this.updateCartCount(); // تحديث العدد الإجمالي
  // }

  // تحديث العدد الإجمالي
  private updateCartCount(): void {
    const totalCount = this.cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.cartCount.next(totalCount);
  }

  // حفظ السلة في localStorage
  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // دالة للحصول على التوكن من localStorage
  private getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  // دالة للحصول على الهيدر مع التوكن
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // دالة لإرسال الطلب
  submitOrder(orderData: any): Observable<any> {
    return this._http.post(this.orderUrl, orderData, {
      headers: this.getHeaders(), // إضافة الهيدر مع التوكن
    });
  }
}
