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
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormCardComponent } from './form-card/form-card.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { MakeActionComponent } from './make-action/make-action.component';
import { SubCatagoryComponent } from './sub-catagory/sub-catagory.component';
import { GetSubCatagoryComponent } from './get-sub-catagory/get-sub-catagory.component';
import { GetSubSubCategoryComponent } from './get-sub-sub-category/get-sub-sub-category.component';
import { GetProductMainCategoryComponent } from './get-product-main-category/get-product-main-category.component';
import { ProMainCatEditComponent } from './pro-main-cat-edit/pro-main-cat-edit.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EditProductComponent } from './edit-product/edit-product.component';
import { PreviewComponent } from './preview/preview.component';
import { PreviewNavbarComponent } from './preview-navbar/preview-navbar.component';
import { NavbarTrimPipe } from './navbar-trim.pipe'; // Editor
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditSubcategoryComponent } from './edit-subcategory/edit-subcategory.component';
import { EditMaincategoryComponent } from './edit-maincategory/edit-maincategory.component';
import { NewAndPressComponent } from './new-and-press/new-and-press.component';
import { AddNewsComponent } from './new-and-press/add-news/add-news.component';
import { TesmonialsComponent } from './tesmonials/tesmonials.component';
import { AddEditTestimonialsComponent } from './tesmonials/add-edit-testimonials/add-edit-testimonials.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { AddEditEventsComponent } from './events/add-edit-events/add-edit-events.component'; // Drag and Drop
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SeeWhatWeDoComponent } from './see-what-we-do/see-what-we-do.component';
import { AddEditSeeWhatWeDoComponent } from './see-what-we-do/add-edit-see-what-we-do/add-edit-see-what-we-do.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UrlSanitizePipe } from './pipes/url-sanitize.pipe';
import { ContactusComponent } from './contactus/contactus.component';
import { EditComponent } from './contactus/edit/edit.component';
import { EditContactusComponent } from './contactus/edit-contactus/edit-contactus.component';
import { AddComponent } from './home/add/add.component';
import { ManageDataSheetsComponent } from './manage-data-sheets/manage-data-sheets.component';
import { RemovewhitespacesPipe } from './removewhitespaces.pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FormComponent } from './manage-data-sheets/form/form.component';
import { CarasoulEditComponent } from './carasoul-edit/carasoul-edit.component';
import { CareerComponent } from './career/career.component';
import { AddEditCareerComponent } from './career/add-edit-career/add-edit-career.component';
import { ApplicationComponent } from './application/application.component';
import { MatTableModule } from '@angular/material/table';
import { AboutComponent } from './about/about.component';
import { TeamsComponent } from './about/teams/teams.component';
import { AddEditTeamsComponent } from './about/teams/add-edit-teams/add-edit-teams.component';
import { HistoryComponent } from './about/history/history.component';
import { ExportComplianceComponent } from './about/export-compliance/export-compliance.component';
import { AboutDefaultComponent } from './about/about-default/about-default.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MatPaginatorModule } from '@angular//material/paginator';
import { SocialLinkComponent } from './social-link/social-link.component';
import { AddEditSocialLinkComponent } from './social-link/add-edit-social-link/add-edit-social-link.component';
import { UserHistoryComponent } from './manage-users/user-history/user-history.component';
import { AddEditAboutDefaultComponent } from './about/about-default/add-edit-about-default/add-edit-about-default.component';
import { EditInstrumentComponent } from './edit-instrument/edit-instrument.component';
import { AddInstrumentModalComponent } from './edit-instrument/add-instrument-modal/add-instrument-modal.component';
import { ComplianceWhistleblowingComponent } from './about/compliance-whistleblowing/compliance-whistleblowing.component';
import { HelpdeskFormComponent } from './about/compliance-whistleblowing/helpdesk-form/helpdesk-form.component';
import { CommingSoonComponent } from './comming-soon/comming-soon.component';
import { ManageAzureFilesComponent } from './manage-azure-files/manage-azure-files.component';
import { AddEditAzureFilesNewComponent } from './manage-azure-files/add-edit-azure-files-new/add-edit-azure-files-new.component';
import { ContactBtgComponent } from './contact-btg/contact-btg.component';
import { AddEditContactBtgComponent } from './contact-btg/add-edit-contact-btg/add-edit-contact-btg.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

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
    GetSubCatagoryComponent,
    GetSubSubCategoryComponent,
    GetProductMainCategoryComponent,
    ProMainCatEditComponent,
    EditProductComponent,
    PreviewComponent,
    PreviewNavbarComponent,
    NavbarTrimPipe,
    EditSubcategoryComponent,
    EditMaincategoryComponent,
    NewAndPressComponent,
    AddNewsComponent,
    TesmonialsComponent,
    AddEditTestimonialsComponent,
    HomeComponent,
    EventsComponent,
    AddEditEventsComponent,
    SeeWhatWeDoComponent,
    AddEditSeeWhatWeDoComponent,
    UrlSanitizePipe,
    ContactusComponent,
    EditComponent,
    EditContactusComponent,
    AddComponent,
    ManageDataSheetsComponent,
    RemovewhitespacesPipe,
    FormComponent,
    CarasoulEditComponent,
    CareerComponent,
    AddEditCareerComponent,
    ApplicationComponent,
    AboutComponent,
    TeamsComponent,
    AddEditTeamsComponent,
    HistoryComponent,
    ExportComplianceComponent,
    AboutDefaultComponent,
    ManageUsersComponent,
    SocialLinkComponent,
    AddEditSocialLinkComponent,
    UserHistoryComponent,
    AddEditAboutDefaultComponent,
    EditInstrumentComponent,
    AddInstrumentModalComponent,
    ComplianceWhistleblowingComponent,
    HelpdeskFormComponent,
    CommingSoonComponent,
    ManageAzureFilesComponent,
    AddEditAzureFilesNewComponent,
    ContactBtgComponent,
    AddEditContactBtgComponent,
    SubscribeComponent
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
    AngularEditorModule,
    ModalModule.forRoot(),
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    PdfViewerModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [
    MatDatepickerModule
  ],
  providers: [BsModalRef, GlobalConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
