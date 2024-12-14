import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolsComponent } from './dashboard/schools/schools.component';
import { HomeComponent } from './dashboard/home/home.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { AppointmentComponent } from './add-school/appointment/appointment.component';
import { KDMComponent } from './add-school/kdm/kdm.component';
import { HotLeadComponent } from './add-school/hot-lead/hot-lead.component';
import { ProposalSignedComponent } from './add-school/proposal-signed/proposal-signed.component';
import { ParentOrientationComponent } from './add-school/parent-orientation/parent-orientation.component';
import { ContractSignedComponent } from './add-school/contract-signed/contract-signed.component';
import { SchoolDetailComponent } from './add-school/school-detail/school-detail.component';
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
import { LostComponent } from './add-school/lost/lost.component';
import { authGuard } from '../guards/auth-guard.service';
import { ProductDemoComponent } from './add-school/product-demo/product-demo.component';
import { ProductDemoViewComponent } from './school-view/product-demo-view/product-demo-view.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,canActivate:[authGuard],children:[
    {path:'',redirectTo:'/dashboard',pathMatch:'full'},
    {path:'dashboard',component:HomeComponent},
    {path:'school-lists',component:SchoolListsComponent},
    {path:'schools', component:SchoolsComponent}
  ]},
  {path:'add-schools',component:AddSchoolComponent,canActivate:[authGuard],children:[
    {path:'',redirectTo:'add',pathMatch:'full'},
    {path:'add',component:SchoolDetailComponent},
    {path:'appointment',component:AppointmentComponent},
    {path:'kdm',component:KDMComponent},
    {path:'product-demo',component:ProductDemoComponent},
    {path:'product-presentation',component:ProductPresentationComponent},
    {path:'hot-lead',component:HotLeadComponent},
    {path:'proposal-signed',component:ProposalSignedComponent},
    {path:'parent-orientation',component:ParentOrientationComponent},
    {path:'contract-signed',component:ContractSignedComponent},
    {path:'lost',component:LostComponent}
  ]},
  {path:'prospect',canActivate:[authGuard],component:ProspectViewComponent},
  {path:'appointment',canActivate:[authGuard],component:AppointmentViewComponent},
  {path:'kdm',canActivate:[authGuard],component:KdmViewComponent},
  {path:'product-demo',canActivate:[authGuard],component:ProductDemoViewComponent},
  {path:'product-presentation',canActivate:[authGuard],component:ProductViewComponent},
  {path:'hot-lead',canActivate:[authGuard],component:HotLeadViewComponent},
  {path:'proposal-signed',canActivate:[authGuard],component:ProposalSignedViewComponent},
  {path:'parent-orientation',canActivate:[authGuard],component:POViewComponent},
  {path:'contract-signed',canActivate:[authGuard],component:ContractSignedViewComponent},
  {path:'profile',canActivate:[authGuard],component:ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
