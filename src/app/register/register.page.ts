import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastController: ToastController,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createregisterForm();
  }

  createregisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  register() {
    if (this.registerForm.valid) {
      let isSuccess = true;
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel)
        .catch(error => {
          isSuccess = false
          this.presentToast(this.authService.setErrorMessage(error));
        })
        .finally(() => {
          if (isSuccess) {
            this.userService.addUser(registerModel).finally(() => {
              this.presentToast("Kayıt İşlemi Başarılı");
              this.router.navigate(["/login"]);
            })
          }

        })
    }
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
