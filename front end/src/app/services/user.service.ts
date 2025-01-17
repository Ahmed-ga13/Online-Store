import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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

  // إرسال طلب GET للحصول على المستخدمين
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/user', {
      headers: this.getHeaders(), // إضافة الهيدر مع التوكن
    });
  }
}
