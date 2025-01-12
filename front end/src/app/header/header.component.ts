import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { AuthoService } from '../services/autho.service'; // استيراد خدمة التوثيق
import { RouterLink } from '@angular/router';
import { NgControl } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterLink, NgIf],
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0; // عدد المنتجات في السلة
  isLoggedIn: boolean = false; // حالة تسجيل الدخول
  isAdmin: boolean = false; // حالة الدخول كمسؤول
  

  constructor(
    private cartService: CartService,
    private authoService: AuthoService
  ) {}

  ngOnInit(): void {
    // مراقبة عدد المنتجات في السلة
    this.cartService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });

    // تحديث حالة تسجيل الدخول عند التغيير
    this.authoService.tokenSubject.subscribe((token) => {
      this.isLoggedIn = !!token; // تحديث الحالة بناءً على التوكن
    });

    // تحديث حالة الدخول كمسؤول عند التغيير
    this.authoService.tokenSubject.subscribe((token) => {
      const decodedToken = this.authoService.decodeAccessToken(); // فك التوكن
      this.isAdmin = decodedToken?.userType === 'Admin'; // تحديث الحالة بناءً على دور المستخدم
    });
    
  }

  // تسجيل الخروج
  logout(): void {
    this.authoService.logout(); // تسجيل الخروج عبر الخدمة
    this.isLoggedIn = false;
    this.isAdmin = false;
  }
}
