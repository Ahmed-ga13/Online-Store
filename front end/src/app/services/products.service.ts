import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  productURL = 'http://localhost:3000/products'; // تأكد من أن هذا هو الـ URL الصحيح
  // staticFilesURL = 'http://localhost:3000/imgs/';

  // دالة لجلب المنتجات
  getProducts(): Observable<any> {
    return this._http.get<any>(this.productURL);
  }

  // دالة لجلب المنتج بناءً على ID
  getProductById(id: string | number): Observable<any> {
    return this._http.get<any>(`${this.productURL}/${id}`);
  }

  addProduct(product: FormData): Observable<any> {
    return this._http.post(this.productURL, product);
  }

  // دالة لتحديث المنتج
  updateProduct(id: number, productData: any): Observable<any> {
    return this._http.put(`${this.productURL}/${id}`, productData);
  }

  // دالة لحذف المنتج
  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`${this.productURL}/${id}`);
  }
}
