import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainNavComponent } from './navbar/main-nav/main-nav.component';
import { SubNavComponent } from './navbar/sub-nav/sub-nav.component';
import { GlobalConstants } from './common/global-constants';
import {MatSelectModule} from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormCardComponent } from './form-card/form-card.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { MakeActionComponent } from './make-action/make-action.component';
import { SubCatagoryComponent } from './sub-catagory/sub-catagory.component';
import { GetSubCatagoryComponent } from './get-sub-catagory/get-sub-catagory.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    MainNavComponent,
    SubNavComponent,
    FormCardComponent,
    ManageAdminsComponent,
    MakeActionComponent,
    SubCatagoryComponent,
    GetSubCatagoryComponent
  ],
  imports: [
  
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSelectModule,
    ModalModule.forRoot()

  ],
  providers: [BsModalRef, GlobalConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
