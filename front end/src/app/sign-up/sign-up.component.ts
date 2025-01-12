import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  imports: [FormsModule, ReactiveFormsModule, NgIf, RouterLink],
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor() {
    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      agree: new FormControl(false, Validators.requiredTrue),
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      // Proceed with submission
      console.log('Form Data:', this.signUpForm.value);
    } else {
      // Mark all fields as touched to trigger validation messages
      this.signUpForm.markAllAsTouched();
    }
  }
}
