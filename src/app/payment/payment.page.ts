import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { CartModel } from '../models/cartModel';
import { Product } from '../models/product';
import { User } from '../models/user';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  @Input() carts: CartModel[]
  @Input() user: User

  totalPrice = 0;
  form: FormGroup
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private toastController: ToastController,
    private cartService:CartService
  ) { }

  ngOnInit() {
    this.carts.forEach(c => {
      if (c.product.isDiscount) {
        this.totalPrice += (c.product.unitPrice - (c.product.unitPrice * c.product.discount / 100)) * c.quantity
      } else {
        this.totalPrice += (c.product.unitPrice) * c.quantity
      }
    })
    this.createForm();
    console.log(this.totalPrice)
  }

  createForm() {
    this.form = this.formBuilder.group({
      creditCardNumber: ['1111 1111 1111 1111', [Validators.required, Validators.maxLength(19)]],
      cvv: ['994', [Validators.required, Validators.maxLength(3)]],
      date: ['02/26', [Validators.required]],
      city: ['Ankara', [Validators.required]],
      addressText: ['Örnek Mahallesi\nFaik Suat Caddesi\nAnkara/Altındağ', [Validators.required]],
      totalPrice: [this.totalPrice]
    })
  }
  payment() {
    if (this.form.valid) {
      let products: Product[] = []
      this.carts.forEach(c => {
        products.push(Object.assign({ quantity: c.quantity }, c.product))
      })
      let order = Object.assign(
        {
          userId: this.user.id,
          products: products
        },
        this.form.value)
      setTimeout(() => {
        this.orderService.addOrder(order).finally(() => {
          this.presentToast("Ödeme Başarılı")
        })
      }, 1000);
      this.carts.forEach(cart=>{
        this.cartService.deleteCartAll(cart.id);
      })

    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
