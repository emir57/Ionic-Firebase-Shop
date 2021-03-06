import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Cart } from '../models/cart';
import { CartModel } from '../models/cartModel';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-carts',
  templateUrl: './my-carts.page.html',
  styleUrls: ['./my-carts.page.scss'],
})
export class MyCartsPage implements OnInit {

  currentUser: User
  carts: CartModel[] = []
  constructor(
    private cartService: CartService,
    private toastController: ToastController,
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
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

  addToCart(cart: Cart) {
    let defaultCart: Cart = {
      productId: cart.productId,
      quantity: cart.quantity,
      userId: cart.userId,
      id: cart.id
    }
    this.cartService.getCart(cart.id).subscribe(cart => {
      if (cart.quantity < 2) {
        this.cartService.addToCart(defaultCart)
        this.presentToast("Başarıyla Eklendi")
      } else {
        this.presentToast("Her üründen en fazla 2 ürün eklenebilir.")
      }
    })

  }
  deleteToCart(cart: Cart) {
    this.cartService.deleteCart(cart.id)
    this.presentToast("Başarıyla Silindi");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
