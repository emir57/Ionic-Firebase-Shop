import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  @Input() product:Product

  form:FormGroup
  currentUser:User
  constructor(
    private modalController:ModalController,
    private productService:ProductService,
    private cartService:CartService,
    private authService:AuthService,
    private toastController:ToastController,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit() {
    this.currentUser=this.authService.getUserInStorage();
    this.createForm();
  }

  dismiss(){
    this.modalController.dismiss();
  }

  addToCart(){
    let cart:Cart={
      productId:this.product.id,
      userId:this.currentUser.id,
      quantity:1,
    }
    this.cartService.addToCart(cart)
    this.presentToast("Başarıyla Sepete Eklendi")
  }
  createForm(){
    this.form = this.formBuilder.group({
      userId:[this.currentUser.id,[]],
      message:['',[Validators.required]],
      isLike:[false,[]]
    })
  }


  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  commentDo(){
    if(this.form.valid){
      console.log(this.form.value)
    }
  }


}
