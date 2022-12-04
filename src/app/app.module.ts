import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { SentimentComponent } from './sentiment/sentiment.component';
import { HomeComponent } from './home/home.component';

import { StorageService } from './services/storage.service';
import { FinnhubapiService } from './services/finnhubapi.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonthPipe } from './month.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    SentimentComponent,
    HomeComponent,
    MonthPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    StorageService,
    FinnhubapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
