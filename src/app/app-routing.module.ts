import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutDefaultComponent } from './about/about-default/about-default.component';
import { AboutComponent } from './about/about.component';
import { ExportComplianceComponent } from './about/export-compliance/export-compliance.component';
import { HistoryComponent } from './about/history/history.component';
import { TeamsComponent } from './about/teams/teams.component';
import { ApplicationComponent } from './application/application.component';
import { AuthGuard } from './auth.guard';
import { CareerComponent } from './career/career.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditMaincategoryComponent } from './edit-maincategory/edit-maincategory.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditSubcategoryComponent } from './edit-subcategory/edit-subcategory.component';
import { EventsComponent } from './events/events.component';
import { GetProductMainCategoryComponent } from './get-product-main-category/get-product-main-category.component';
import { GetSubCatagoryComponent } from './get-sub-catagory/get-sub-catagory.component';
import { GetSubSubCategoryComponent } from './get-sub-sub-category/get-sub-sub-category.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { ManageDataSheetsComponent } from './manage-data-sheets/manage-data-sheets.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewAndPressComponent } from './new-and-press/new-and-press.component';
import { PreviewComponent } from './preview/preview.component';
import { ProMainCatEditComponent } from './pro-main-cat-edit/pro-main-cat-edit.component';
import { SeeWhatWeDoComponent } from './see-what-we-do/see-what-we-do.component';
import { SubCatagoryComponent } from './sub-catagory/sub-catagory.component';
import { TesmonialsComponent } from './tesmonials/tesmonials.component';

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
  {path:'edit-maincategory/:id' , component:EditMaincategoryComponent , canActivate:[AuthGuard]},
  {path:'preview' , component:PreviewComponent , canActivate:[AuthGuard]},
  {path:'News & Press Release' , component:NewAndPressComponent , canActivate:[AuthGuard]},
  {path:'testimonials' , component:TesmonialsComponent , canActivate:[AuthGuard]},
  {path:'Home' , component:HomeComponent , canActivate:[AuthGuard]},
  {path:'Events' , component:EventsComponent , canActivate:[AuthGuard]},
  {path:'see-what-we-do' , component:SeeWhatWeDoComponent , canActivate:[AuthGuard]},
  {path:'contactus' , component:ContactusComponent , canActivate:[AuthGuard]},
  {path:'Careers' , component:CareerComponent , canActivate:[AuthGuard]},
  {path:'About' , component:AboutComponent, canActivate:[AuthGuard]},
  {path:'About/about' , component:AboutDefaultComponent, canActivate:[AuthGuard]},
  {path:'About/teams', component: TeamsComponent, canActivate:[AuthGuard]},
  {path:'About/history', component: HistoryComponent, canActivate:[AuthGuard]},
  {path:'About/export-complaince', component: ExportComplianceComponent, canActivate:[AuthGuard]},
  {path:'applications' , component:ApplicationComponent , canActivate:[AuthGuard]},
  {path:'manage-data-sheet/:id/:name' , component:ManageDataSheetsComponent , canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
