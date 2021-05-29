import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GetSubCatagoryComponent } from './get-sub-catagory/get-sub-catagory.component';
import { LoginComponent } from './login/login.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SubCatagoryComponent } from './sub-catagory/sub-catagory.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
  { path: 'manage-admin', component: ManageAdminsComponent, canActivate: [AuthGuard] },
  {path:'sub-cat/:id' , component:SubCatagoryComponent , canActivate:[AuthGuard]},
  {path:'get-sub-cat/:id' , component:GetSubCatagoryComponent , canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
