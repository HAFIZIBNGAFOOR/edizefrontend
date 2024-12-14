import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolsComponent } from './dashboard/schools/schools.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { SchoolDetailComponent } from './add-school/school-detail/school-detail.component';
import { AppointmentComponent } from './add-school/appointment/appointment.component';
import { KDMComponent } from './add-school/kdm/kdm.component';
import { HotLeadComponent } from './add-school/hot-lead/hot-lead.component';
import { ProposalSignedComponent } from './add-school/proposal-signed/proposal-signed.component';
import { ParentOrientationComponent } from './add-school/parent-orientation/parent-orientation.component';
import { ContractSignedComponent } from './add-school/contract-signed/contract-signed.component';
import { ProductPresentationComponent } from './add-school/product-presentation/product-presentation.component';
import { SchoolListsComponent } from './dashboard/school-lists/school-lists.component';
import { SchoolViewComponent } from './school-view/school-view.component';
import { ProspectViewComponent } from './school-view/prospect-view/prospect-view.component';
import { AppointmentViewComponent } from './school-view/appointment-view/appointment-view.component';
import { KdmViewComponent } from './school-view/kdm-view/kdm-view.component';
import { ProductViewComponent } from './school-view/product-view/product-view.component';
import { HotLeadViewComponent } from './school-view/hot-lead-view/hot-lead-view.component';
import { ProposalSignedViewComponent } from './school-view/proposal-signed-view/proposal-signed-view.component';
import { POViewComponent } from './school-view/po-view/po-view.component';
import { ContractSignedViewComponent } from './school-view/contract-signed-view/contract-signed-view.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { NavComponent } from '../generic/nav/nav.component';
import { LostComponent } from './add-school/lost/lost.component';
import { ProductDemoComponent } from './add-school/product-demo/product-demo.component';
import { ProductDemoViewComponent } from './school-view/product-demo-view/product-demo-view.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SchoolsComponent,
    HomeComponent,
    AddSchoolComponent,
    SchoolDetailComponent,
    AppointmentComponent,
    KDMComponent,
    HotLeadComponent,
    ProposalSignedComponent,
    ParentOrientationComponent,
    ContractSignedComponent,
    ProductPresentationComponent,
    SchoolListsComponent,
    SchoolViewComponent,
    ProspectViewComponent,
    AppointmentViewComponent,
    KdmViewComponent,
    ProductViewComponent,
    HotLeadViewComponent,
    ProposalSignedViewComponent,
    POViewComponent,
    ContractSignedViewComponent,
    ProfileComponent,
    NavComponent,
    LostComponent,
    ProductDemoComponent,
    ProductDemoViewComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class HomeModule { }
