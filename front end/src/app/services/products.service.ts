import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  productURL = 'http://localhost:3000/products'; // تأكد من أن هذا هو الـ URL الصحيح

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

  // دالة لجلب المنتجات وتصفية المحذوفة
  getProducts(): Observable<any> {
    return this._http
      .get<any>(this.productURL, {
        headers: this.getHeaders(), // إضافة الهيدر مع التوكن
      })
      .pipe(
        map((products: any[]) => products.filter((product) => !product.isDeleted)) // تصفية المنتجات المحذوفة
      );
  }

  // دالة لجلب المنتج بناءً على ID
  getProductById(id: string | number): Observable<any> {
    return this._http.get<any>(`${this.productURL}/${id}`, {
      headers: this.getHeaders(), // إضافة الهيدر مع التوكن
    });
  }

  // دالة لإضافة منتج
  addProduct(product: FormData): Observable<any> {
    return this._http.post(this.productURL, product, {
      headers: this.getHeaders(), // إضافة الهيدر مع التوكن
    });
  }

  // دالة لتحديث المنتج
  updateProduct(id: number, productData: any): Observable<any> {
    return this._http.put(`${this.productURL}/${id}`, productData, {
      headers: this.getHeaders(), // إضافة الهيدر مع التوكن
    });
  }

  // دالة لتحديث حالة الحذف (بدلاً من الحذف الكامل)
  deleteProduct(id: number): Observable<any> {
    // تحديث المنتج مع حالة isDeleted
    return this._http.put(
      `${this.productURL}/${id}`,
      { isDeleted: true },
      {
        headers: this.getHeaders(), // إضافة الهيدر مع التوكن
      }
    );
  }
}
