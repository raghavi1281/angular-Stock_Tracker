import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { FinnhubapiService } from '../services/finnhubapi.service';
import { IQuoteData } from '../Interfaces/IStockData';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: []
})
export class CardComponent implements OnInit {
  stockValues!: string[];
  quoteData: IQuoteData[] = [];

  constructor(private _storageservice: StorageService, private _apiservice:FinnhubapiService) { }

  ngOnInit(): void {
    this.stockValues = JSON.parse(localStorage.getItem('name')!);
    if(this.stockValues)
    {
      for(let symbol of this.stockValues)
      {
        this._storageservice.loadValues(symbol);
      }
    } 

    this._storageservice.data.subscribe(
      name => {
        let values = localStorage.getItem('name');
        this.stockValues = values?JSON.parse(values):[];
        this.stockValues.reverse();
        this.quoteData.splice(0, this.quoteData.length);
        this.getValues();
    }); 
  }

  getValues(){
    for(let sym of this.stockValues)
    {
      if(this._storageservice.getValues(sym))
        this.quoteData.push(this._storageservice.getValues(sym));
    }
  }

  removeData(name:string){
    let values: string[] = JSON.parse(localStorage.getItem('name')!);
    values.splice(values.indexOf(name), 1);
    localStorage.setItem('name', JSON.stringify(values));
    this._storageservice.data.next('remove');
  }
}
