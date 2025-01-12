import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
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
            this._router.navigate(['/home']); // التوجيه إلى صفحة بعد تسجيل الدخول
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
    // تأكد من أن الدور محفوظ في localStorage عند تسجيل الدخول
    return localStorage.getItem('role') === 'Admin';
  }
}
