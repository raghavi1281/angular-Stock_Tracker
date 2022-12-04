import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ISentiment,ISentimentResponse } from '../Interfaces/ISentiment';
import { ISearchResponse, ISearchresult } from '../Interfaces/ISearch';
import { IStockData } from '../Interfaces/IStockData';

@Injectable({
  providedIn: 'root'
})
export class FinnhubapiService {

  constructor(private httpclient: HttpClient) { }

  apikey:string = 'bu4f8kn48v6uehqi3cqg';

  getQuoteData(stockSymbol: string): Observable<IStockData>{
    return this.httpclient.get<IStockData>(`https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${this.apikey}`);
  }  

  getStockName(stockSymbol: string): Observable<ISearchresult[]>{
    return this.httpclient.get<ISearchResponse>(`https://finnhub.io/api/v1/search?q=${stockSymbol}&token=${this.apikey}`)
    .pipe(map(data => data.result));
  }

  getSentiment(stockSymbol: string): Observable<ISentiment[]>{
    return this.httpclient.get<ISentimentResponse>(`https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${stockSymbol}&from=2022-09-01&to=2022-12-02&token=${this.apikey}`)
    .pipe(map(data=>data['data']));
  }

}
