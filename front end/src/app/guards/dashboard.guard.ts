import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthoService } from '../services/autho.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private authService: AuthoService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = this.authService.tokenSubject.value;
    if (token) {
      // فك التوكن
      const decodedToken = this.authService.decodeAccessToken();
      if (decodedToken && decodedToken.userType === 'Admin') {
        return true; // السماح بالوصول إذا كان دور المستخدم Admin
      }
    }

    // إذا لم يكن المستخدم Admin أو التوكن مفقود
    this.router.navigate(['/login']); // توجيه المستخدم إلى صفحة تسجيل الدخول
    return false;
  }
}
