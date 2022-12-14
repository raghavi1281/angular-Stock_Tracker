import { Injectable } from '@angular/core';
import { map, Subject } from "rxjs";
import { FinnhubapiService } from './finnhubapi.service';
import { IQuoteData, IStockData } from '../Interfaces/IStockData';
import { ISearchresult } from '../Interfaces/ISearch';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  quoteData: Map<string, IQuoteData> = new Map;
  symbolNames: Map<string, string> = new Map;
  
  data: Subject<string>= new Subject();

  constructor(private _apiservice: FinnhubapiService) { }

  loadValues(symbol: string){
      this._apiservice.getQuoteData(symbol).subscribe(data=>{
        this._apiservice.getStockName(symbol).subscribe(result=>{
          this.mapQuoteData(data, result, symbol);
          this.data.next('start');
        })
      });
    
  }

  storeStockDetails(stockSymbol: string){
    let storage = localStorage.getItem('name');
    let values: string[] = storage?JSON.parse(storage):[];
    let i = values.indexOf(stockSymbol);
    if(i !== -1)
      values.splice(i,1);
    
    this._apiservice.getQuoteData(stockSymbol).subscribe(data=>{
      if(data.d)
      {
        values.push(stockSymbol);
        localStorage.setItem('name', JSON.stringify(values));
        this._apiservice.getStockName(stockSymbol).subscribe(result=>{
          this.mapQuoteData(data, result, stockSymbol);
          this.data.next(stockSymbol);
        }) 
      }
      else
        alert("stock symbol '"+ stockSymbol+ "'doesn't exist!!")
    });   
  }

  mapQuoteData(data: IStockData, result: string, symbol: string){
      this.quoteData.set(symbol, {name: result, 
                                        symbol: symbol, 
                                        quote:data});
      this.symbolNames.set(symbol,result);
    
  }
  getValues(symbol: string): IQuoteData
  {
      return this.quoteData.get(symbol)!;
  }
}
