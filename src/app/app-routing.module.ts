import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './sentiment/sentiment.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
      { path: 'sentiment/:symbol', component: SentimentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
