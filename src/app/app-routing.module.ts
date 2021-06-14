import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditMaincategoryComponent } from './edit-maincategory/edit-maincategory.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditSubcategoryComponent } from './edit-subcategory/edit-subcategory.component';
import { GetProductMainCategoryComponent } from './get-product-main-category/get-product-main-category.component';
import { GetSubCatagoryComponent } from './get-sub-catagory/get-sub-catagory.component';
import { GetSubSubCategoryComponent } from './get-sub-sub-category/get-sub-sub-category.component';
import { LoginComponent } from './login/login.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PreviewComponent } from './preview/preview.component';
import { ProMainCatEditComponent } from './pro-main-cat-edit/pro-main-cat-edit.component';
import { SubCatagoryComponent } from './sub-catagory/sub-catagory.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
  { path: 'manage-admin', component: ManageAdminsComponent, canActivate: [AuthGuard] },
  {path:'sub-cat/:id' , component:SubCatagoryComponent , canActivate:[AuthGuard]},
  {path:'get-sub-cat/:id' , component:GetSubCatagoryComponent , canActivate:[AuthGuard]},
  {path:'get-sub-sub-cat/:id' , component:GetSubSubCategoryComponent , canActivate:[AuthGuard]},
  {path:'get-prod-main-cat/:id' , component:GetProductMainCategoryComponent , canActivate:[AuthGuard]},
  {path:'edit-pro-main-cat/:id' , component:ProMainCatEditComponent , canActivate:[AuthGuard]},
  {path:'edit-product/:id' , component:EditProductComponent , canActivate:[AuthGuard]},
  {path:'edit-subcategory/:id' , component:EditSubcategoryComponent , canActivate:[AuthGuard]},
  {path:'edit-maincatergory/:id' , component:EditMaincategoryComponent , canActivate:[AuthGuard]},
  {path:'preview' , component:PreviewComponent , canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
