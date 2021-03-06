import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { RoleGuard } from './guards/role.guard';
import { SecurityGuard } from './guards/security.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[SecurityGuard]
  },
  {
    path: 'product-add',
    loadChildren: () => import('./product-add/product-add.module').then( m => m.ProductAddPageModule),
    canActivate:[SecurityGuard,AdminGuard]
  },
  {
    path: 'category-add',
    loadChildren: () => import('./category-add/category-add.module').then( m => m.CategoryAddPageModule),
    canActivate:[SecurityGuard,AdminGuard]
  },
  {
    path: 'all-products',
    loadChildren: () => import('./all-products/all-products.module').then( m => m.AllProductsPageModule),
    canActivate:[SecurityGuard,AdminGuard]
  },
  {
    path: 'all-categories',
    loadChildren: () => import('./all-categories/all-categories.module').then( m => m.AllCategoriesPageModule),
    canActivate:[SecurityGuard,AdminGuard]
  },
  {
    path: 'update-products',
    loadChildren: () => import('./product-update/update-products.module').then( m => m.UpdateProductsPageModule),
    canActivate:[SecurityGuard,AdminGuard]
  },
  {
    path: 'category-update',
    loadChildren: () => import('./category-update/category-update.module').then( m => m.CategoryUpdatePageModule),
    canActivate:[SecurityGuard,AdminGuard]
  },
  {
    path: 'all-users',
    loadChildren: () => import('./all-users/all-users.module').then( m => m.AllUsersPageModule),
    canActivate:[SecurityGuard,AdminGuard]
  },
  {
    path: 'user-add',
    loadChildren: () => import('./user-add/user-add.module').then( m => m.UserAddPageModule),
    canActivate:[SecurityGuard,AdminGuard]
  },
  {
    path: 'user-update',
    loadChildren: () => import('./user-update/user-update.module').then( m => m.UserUpdatePageModule),
    canActivate:[SecurityGuard,AdminGuard]
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule),
    canActivate:[SecurityGuard]
  },
  {
    path: 'my-carts',
    loadChildren: () => import('./my-carts/my-carts.module').then( m => m.MyCartsPageModule),
    canActivate:[SecurityGuard]
  },
  {
    path: 'cart-check',
    loadChildren: () => import('./cart-check/cart-check.module').then( m => m.CartCheckPageModule),
    canActivate:[SecurityGuard]
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule),
    canActivate:[SecurityGuard]
  },
  {
    path: 'all-orders',
    loadChildren: () => import('./all-orders/all-orders.module').then( m => m.AllOrdersPageModule),
    canActivate:[SecurityGuard,AdminGuard]
  },
  {
    path: 'my-orders',
    loadChildren: () => import('./my-orders/my-orders.module').then( m => m.MyOrdersPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
