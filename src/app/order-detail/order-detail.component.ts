import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrderDetail(orderId);
    }
  }

  loadOrderDetail(orderId: string): void {
    this.http.get<Order>(`http://localhost:3000/api/orders/${orderId}`).subscribe(
      (data) => {
        this.order = data;
      },
      (error) => {
        console.error('Error fetching order details', error);
      }
    );
  }

  getImagePath(imageName?: string): string {
    return imageName ? `assets/${imageName}` : 'assets/default-image.jpg'; // Đường dẫn đến hình ảnh mặc định
  }
}

// Gộp phần module vào đây
@NgModule({
  imports: [CommonModule],
  declarations: [OrderDetailComponent],
  exports: [OrderDetailComponent]
})
export class OrderDetailModule {}
