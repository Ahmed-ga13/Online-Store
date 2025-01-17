import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthoService {
  public tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private _http: HttpClient, private _router: Router) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this.tokenSubject.next(token);
    }
  }

  // إضافة التوكن في الهيدر
  private getHeaders(): HttpHeaders {
    const token = this.tokenSubject.value;
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  login(loginData: { email: string; password: string }): Observable<any> {
    return this._http
      .post<{ accessToken: string }>(
        'http://localhost:3000/user/login',
        loginData
      )
      .pipe(
        tap((res) => {
          const token = res.accessToken;
          if (token) {
            localStorage.setItem('accessToken', token);
            this.tokenSubject.next(token);
            this._router.navigate(['/home']);
          }
        })
      );
  }

  decodeAccessToken(): any {
    const token = this.tokenSubject.value;
    if (token) {
      return jwtDecode<any>(token);
    }
    return null;
  }

  logout(): void {
    this.tokenSubject.next(null); // تحديث الحالة
    localStorage.removeItem('accessToken'); // حذف التوكن
    this._router.navigate(['/login']); // توجيه المستخدم إلى صفحة تسجيل الدخول
  }

  isLoggedIn(): boolean {
    return this.tokenSubject.value !== null;
  }

  // دالة للتحقق إذا كان المستخدم هو Admin
  isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }

  // التحقق من صلاحية التوكن
  isTokenExpired(): boolean {
    const token = this.tokenSubject.value;
    if (token) {
      const decodedToken = jwtDecode<any>(token);
      const expirationDate = decodedToken.exp * 1000; // تحويل التاريخ إلى ميلي ثانية
      return expirationDate < Date.now(); // التحقق إذا انتهت صلاحية التوكن
    }
    return true;
  }

  // دالة لاستخدام التوكن في طلبات HTTP
  makeRequestWithToken(url: string): Observable<any> {
    if (this.isTokenExpired()) {
      this.logout(); // إذا انتهت صلاحية التوكن، يتم تسجيل الخروج
      this._router.navigate(['/login']);
      return new Observable(observer => {
        observer.next(null);
        observer.complete();
      });
    }
    return this._http.get(url, { headers: this.getHeaders() });
  }
}
