import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
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

  currentUser:User
  carts:CartModel[]=[]
  constructor(
    private cartService:CartService,
    private toastController:ToastController,
    private authService:AuthService,
    private productService:ProductService,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getUserInStorage();
    this.cartService.getCartsByUserId(this.currentUser.id)
      .subscribe(getCarts=>{
        getCarts.forEach(c=>{
          this.productService.getProduct(c.productId).subscribe(doc=>{
          this.carts.push(Object.assign({product:doc.data()},c))
          })
        })
    })
  }

  addToCart(cart:Cart){
    let defaultCart:Cart={
      productId:cart.productId,
      quantity:cart.quantity,
      userId:cart.userId,
      id:cart.id
    }
    this.cartService.addToCart(defaultCart)
    this.presentToast("Başarıyla Eklendi")
  }
  deleteToCart(cart:Cart){
    this.cartService.deleteCart(cart.id)
    this.presentToast("Başarıyla Silindi");
  }

  dismiss(){
    this
  }


  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
