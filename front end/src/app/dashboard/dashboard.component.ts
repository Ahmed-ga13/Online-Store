import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../services/order.service';
import { ProductsService } from '../services/products.service';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NgFor, NgIf, ReactiveFormsModule],
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  orders: any[] = [];
  users: any[] = [];
  totalProductsCount: number = 0;
  totalOrdersCount: number = 0;
  totalUsersCount: number = 0;
  showAddProductForm = false;
  selectedProduct: any = null; // منتج مختار للتعديل

  constructor(
    private productService: ProductsService,
    private userService: UserService // private orderService: OrderService,
  ) {}

  ngOnInit(): void {
    // Load products, orders, and users
    this.loadProducts();
    this.loadUsers();
    // this.loadOrders();
  }

  // دالة لفتح فورم إضافة منتج
  openAddProductModal() {
    this.showAddProductForm = true;
  }

  // دالة لإغلاق الفورم لو عايز
  closeAddProductForm() {
    this.showAddProductForm = false;
  }

  addproductForm = new FormGroup({
    name: new FormControl(''),
    new_price: new FormControl(''),
    old_price: new FormControl(''),
    productImage: new FormControl(null),
    category: new FormControl(''), // إضافة حقل الفئة
  });

  onFilleChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addproductForm.patchValue({ productImage: file });
    }
  }

  addproduct() {
    let formData = new FormData();
    formData.append('name', this.addproductForm.get('name')?.value || '');
    formData.append(
      'new_price',
      this.addproductForm.get('new_price')?.value || ''
    );
    formData.append(
      'old_price',
      this.addproductForm.get('old_price')?.value || ''
    );
    formData.append(
      'description',
      this.addproductForm.get('description')?.value || ''
    );
    formData.append(
      'category',
      this.addproductForm.get('category')?.value || ''
    );
    formData.append(
      'productImage',
      this.addproductForm.get('productImage')?.value || ''
    );

    this.productService.addProduct(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.showAddProductForm = false; // Hide the form after adding
        // إضافة المنتج لقائمة المنتجات
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  // الفورم الذي سيستخدم لتعديل المنتج
  editProductForm = new FormGroup({
    name: new FormControl(''),
    new_price: new FormControl(''),
    old_price: new FormControl(''),
    category: new FormControl(''),
    productImage: new FormControl(null),
  });

  // دالة لفتح نافذة التعديل عندما يتم الضغط على زر "Edit"
  openEditProductModal(product: any) {
    this.selectedProduct = product;
    this.editProductForm.setValue({
      name: product.name,
      new_price: product.new_price,
      old_price: product.old_price,
      category: product.category,
      productImage: null, // يمكن إضافة صورة جديدة إذا لزم الأمر
    });
    this.showAddProductForm = true; // إظهار الفورم لتعديل المنتج
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.totalProductsCount = data.length;
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.totalUsersCount = data.length;
    });
  }
  // loadOrders(): void {
  //   this.orderService.getOrders().subscribe((data) => {
  //     this.orders = data;
  //     this.totalOrdersCount = data.length;
  //   });
  // }

  // دالة لتحديث المنتج
  updateProduct() {
    if (this.editProductForm.valid) {
      const updatedProduct = this.editProductForm.value;
      this.productService
        .updateProduct(this.selectedProduct.id, updatedProduct)
        .subscribe((response) => {
          console.log('Product updated:', response);
          // بعد التحديث، يمكن إعادة تحميل قائمة المنتجات أو القيام بأي شيء آخر
        });
    }
  }

  // دالة لرفع الصورة إذا لزم الأمر
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editProductForm.patchValue({ productImage: file });
    }
  }

  // داله ل حذف المنتج
  deleteProduct(id: number, isDelete: boolean) {
    if (!isDelete) {
      // إذا كانت isDelete غير صحيحة، لا نقوم بتنفيذ الحذف
      alert('هذا المنتج لا يمكن حذفه.');
      return;
    }

    const confirmationMessage = 'Are you sure you want to delete this product?';
    if (confirm(confirmationMessage)) {
      this.productService.deleteProduct(id).subscribe({
        next: (response) => {
          console.log('Product deleted:', response);
          this.loadProducts(); // إعادة تحميل البيانات بعد الحذف
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        },
      });
    }
  }
}


