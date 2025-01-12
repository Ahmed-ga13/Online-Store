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
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthoService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // التحقق إذا كان المستخدم مسجلاً الدخول
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // إذا لم يكن مسجلاً الدخول، إعادة توجيه المستخدم إلى صفحة تسجيل الدخول
      this.router.navigate(['/login']);
      return false;
    }
  }
}
