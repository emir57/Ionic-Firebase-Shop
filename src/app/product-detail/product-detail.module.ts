import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailPageRoutingModule } from './product-detail-routing.module';

import { ProductDetailPage } from './product-detail.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ProductDetailPageRoutingModule,
    PipesModule
  ],
  declarations: [ProductDetailPage]
})
export class ProductDetailPageModule {}
