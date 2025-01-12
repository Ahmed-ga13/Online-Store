import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // استيراد التوجيه
import { AuthoService } from '../services/autho.service'; // استيراد خدمة المصادقة
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, ReactiveFormsModule, NgIf,RouterLink],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = ''; // لعرض رسائل الخطأ

  constructor(
    private fb: FormBuilder,
    private authoService: AuthoService, // حقن خدمة المصادقة
    private router: Router // حقن خدمة التوجيه
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authoService.login(loginData).subscribe({
        next: (response) => {
          // فك التوكن مباشرة بعد تسجيل الدخول
          const decodedToken = this.authoService.decodeAccessToken();
          const userType = decodedToken?.userType; // استخدم `userType` بدلاً من `role` أو أي خاصية أخرى

          if (userType === 'Admin') {
            this.router.navigate(['/dashboard']); // التوجيه إلى لوحة التحكم (Dashboard)
          } else if (userType === 'User') {
            this.router.navigate(['/home']); // التوجيه إلى الصفحة الرئيسية (Home)
          } else {
            this.errorMessage = 'User type not recognized!'; // في حال عدم تحديد نوع المستخدم
          }
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Invalid email or password!'; // في حال حدوث خطأ في تسجيل الدخول
        },
      });
    } else {
      this.errorMessage = 'Please fill in all fields correctly!'; // إذا كانت البيانات المدخلة غير صالحة
    }
  }
}
