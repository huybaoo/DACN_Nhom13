import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Product } from '../models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = []; // Thêm thuộc tính cho sản phẩm liên quan

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router // Thêm Router vào constructor
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const productId = params['id'];
      if (productId) {
        this.getProductDetail(); // Thay vì fetchProductDetails
        this.getRelatedProducts(); // Thay vì fetchRelatedProducts
      }
    });
  }

  getProductDetail(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe(
        (data: Product) => {
          this.product = data;
        },
        (error) => {
          console.error('Lỗi khi lấy sản phẩm:', error);
        }
      );
    }
  }

  getRelatedProducts(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getRelatedProducts(productId).subscribe(
        (data: Product[]) => {
          this.relatedProducts = data;
        },
        (error) => {
          console.error('Lỗi khi lấy sản phẩm liên quan:', error);
        }
      );
    }
  }

  navigateToProductDetail(productId: string): void {
    console.log('Navigating to product id:', productId);
    this.router.navigate(['/product', productId]); // Sử dụng navigate thay vì navigateByUrl
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
      alert('Sản phẩm đã được thêm vào giỏ hàng.');
    }
  }

  getImagePath(imageName?: string): string {
    return imageName ? `assets/${imageName}` : 'assets/default-image.jpg';
  }
}
