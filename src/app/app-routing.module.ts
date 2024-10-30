import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewBusinessComponent } from './PrivateCar/new-business/new-business.component';
import { QuoteComponent } from './PrivateCar/quote/quote.component';
import { QuoteDetailComponent } from './PrivateCar/quote-detail/quote-detail.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashComponent } from './Commercial/dash/dash.component';

const routes: Routes = [
  { path: '', redirectTo: 'sign', pathMatch: 'full' },
  { path: 'dash', component: DashboardComponent },
  { path: 'PrivatecarNewBusiness', component: NewBusinessComponent },
  { path: 'Quote', component: QuoteComponent },
  { path: 'Quotedetail', component: QuoteDetailComponent },
  { path: 'sign', component: SignInComponent },
  { path: 'commericialDash', component: DashComponent },
  { path: '**', redirectTo: 'sign' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
