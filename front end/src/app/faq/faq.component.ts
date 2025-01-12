import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  imports: [CommonModule],
})
export class FaqComponent {
  faqs = [
    {
      question: 'What services do you offer?',
      answer:
        'We offer a wide range of clothing items for men, women, and children, including casual wear, formal wear, sportswear, and accessories. Our collection is updated regularly with the latest trends and styles.',
      isOpen: false,
    },
    {
      question: 'How long does it take to process and deliver an order?',
      answer:
        'Order processing typically takes 1-2 business days. Delivery time depends on your location and shipping method, but it usually ranges between 3-7 business days.',
      isOpen: false,
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept various payment methods, including credit/debit cards, PayPal, and cash on delivery (available in select areas).',
      isOpen: false,
    },
    {
      question: 'Do you offer returns and exchanges?',
      answer:
        'Yes, we offer a hassle-free return and exchange policy within 14 days of receiving your order. Items must be in their original condition with tags attached. For more details, visit our Returns & Exchanges page.',
      isOpen: false,
    },
    {
      question: 'Do you have size guides?',
      answer:
        'Yes, each product page includes a detailed size guide to help you choose the perfect fit. If you have further questions, feel free to contact our support team.',
      isOpen: false,
    },
    {
      question: 'What discounts and offers do you provide?',
      answer:
        'We frequently run promotions, discounts, and seasonal sales. Sign up for our newsletter to stay updated on the latest offers and exclusive deals.',
      isOpen: false,
    },
    {
      question: 'Is my personal information secure?',
      answer:
        'Absolutely! We prioritize your privacy and use advanced security measures to protect your personal and payment information.',
      isOpen: false,
    },
    {
      question: 'Can I track my order?',
      answer:
        'Yes, once your order is shipped, you will receive a tracking number via email or SMS to monitor its status in real time.',
      isOpen: false,
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Currently, we ship to select countries. Check our Shipping Information page for the complete list of available regions.',
      isOpen: false,
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can reach our customer support team via email, live chat, or phone. Visit our Contact Us page for more details.',
      isOpen: false,
    },

    // Add other FAQs here
  ];

  toggleAnswer(faq: any): void {
    faq.isOpen = !faq.isOpen;
  }
}
