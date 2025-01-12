import { Component, NgModule, OnInit } from '@angular/core';
import { CartItem, CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common'; // لإضافة ngFor
import { FormsModule, NgModel } from '@angular/forms'; // لإضافة ngModel

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, FormsModule], // إضافة الموديلات هنا
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // تحديد نوع المتغير cartItems
  cartItemCount: number = 0;
  showCheckoutForm = false;
  successMessage = ''; // Variable to display success message
  errorMessage = ''; // Variable to display error message

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems(); // جلب المنتجات من السلة عند تحميل المكون
    // this.cartItemCount = this.cartService.getCartItemCount(); // جلب عدد المنتجات
  }

  // لحساب المجموع الكلي للسلة
  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  onQuantityChange(item: CartItem): void {
    // تحديث الكمية في السلة
    const updatedItem = this.cartItems.find(
      (cartItem) => cartItem.id === item.id
    );
    if (updatedItem) {
      updatedItem.quantity = item.quantity; // تحديث الكمية
      this.cartService.saveCart(); // حفظ السلة
    }
  }

  // الدالة التي تُعرض عند الضغط على "Proceed to Checkout"
  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      this.errorMessage =
        'Your cart is empty. Please add products to your cart before proceeding.';
      this.showCheckoutForm = false;
    } else {
      this.showCheckoutForm = true;
      this.errorMessage = ''; // Clear error message if the cart has items
    }
  }

  // هنا يمكن إضافة دالة لمعالجة بيانات النموذج بعد الإرسال
  submitCheckoutForm(formData: any) {
    // تحقق من ملء جميع الحقول
    if (formData.name && formData.email && formData.address && formData.phone) {
      // جمع بيانات العميل مع تفاصيل المنتجات في السلة
      const orderData = {
        customer: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          phone: formData.phone,
        },
        cartItems: this.cartItems, // المنتجات في السلة
        totalAmount: this.getTotal(), // المجموع الكلي
      };

      // إرسال البيانات إلى الخادم باستخدام الـ observable
      this.cartService.submitOrder(orderData).subscribe(
        (orderResponse) => {
          // إذا تم إرسال الطلب بنجاح
          this.successMessage =
            'Your order has been successfully submitted! Thank you for your purchase.';
          this.errorMessage = ''; // إخفاء رسالة الخطأ إذا كانت موجودة
          this.clearCart(); // مسح السلة بعد إرسال الطلب
        },
        // (error) => {
        //   // إذا كان هناك خطأ في إرسال الطلب
        //   this.errorMessage =
        //     'There was an error processing your order. Please try again.';
        //   this.successMessage = ''; // إخفاء رسالة النجاح إذا كانت موجودة
        // }
      );
    } else {
      // إذا لم يتم ملء جميع الحقول
      this.errorMessage = 'Please fill out all the fields.';
      this.successMessage = ''; // إخفاء رسالة النجاح إذا كانت موجودة
    }
  }

  // Function to clear the cart
  clearCart() {
    this.cartItems = []; // Clear cart items
  }

  // حذف منتج من السلة
  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item); // إزالة المنتج من السلة
    this.cartItems = this.cartService.getCartItems(); // تحديث السلة المعروضة
    // this.cartItemCount = this.cartService.getCartItemCount(); // تحديث العدد
  }
}
