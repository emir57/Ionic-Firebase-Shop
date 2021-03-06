import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartModel } from '../models/cartModel';
import { User } from '../models/user';
import { PaymentPage } from '../payment/payment.page';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-check',
  templateUrl: './cart-check.page.html',
  styleUrls: ['./cart-check.page.scss'],
})
export class CartCheckPage implements OnInit {

  currentUser: User
  carts: CartModel[] = []
  totalPrice=0;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUserInStorage();
    this.cartService.getCartsByUserId(this.currentUser.id)
      .subscribe(getCarts => {
        getCarts.forEach(c => {
          this.productService.getProduct(c.productId).subscribe(doc => {
            let product = Object.assign({ id: doc.id }, doc.data())
            this.carts.push(Object.assign({ product: product }, c))
          })
        })
      })
  }

  async showPaymentModal() {
    const modal = await this.modalController.create({
      component: PaymentPage,
      componentProps: {
        carts: this.carts,
        user: this.currentUser
      }
    })
    return await modal.present();
  }
}
