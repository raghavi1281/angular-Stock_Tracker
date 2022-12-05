import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FinnhubapiService } from '../services/finnhubapi.service';
import { StorageService } from '../services/storage.service';
import { ISentiment } from '../Interfaces/ISentiment';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  providers: [DatePipe]
})
export class SentimentComponent implements OnInit {
  stockSymbol!: string;
  stockName!: string;
  sentimentInfo!: ISentiment[];
  blankmonths: number[] = [];
  constructor(private route: ActivatedRoute, private _apiservice:FinnhubapiService, private _storageservice: StorageService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('symbol');
    this.stockSymbol = name? name:"";
    let date: Date = new Date();
    let toDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    date.setDate(date.getDate()-90);
    let fromDate = this.datepipe.transform(date, 'yyyy-MM-dd');

    if(this._storageservice.symbolNames.get(this.stockSymbol))
    {
      this.stockName = this._storageservice.symbolNames.get(this.stockSymbol)!;
    }
    else
    {
      this._apiservice.getStockName(this.stockSymbol).subscribe(data=>this.stockName = data);
    }

    this._apiservice.getSentiment(this.stockSymbol, fromDate, toDate).subscribe(data=>{
      this.sentimentInfo = data;
      if(data.length > 3)
      {
        data.slice(-3);
        this.sentimentInfo = data;
      }
      else if(data.length < 3)
      {
        let month = date.getMonth()+1;
        if(!this.sentimentInfo.find(r=>r.month == month))
          this.blankmonths.push(9);
        if(!this.sentimentInfo.find(r=>r.month == month+1))
          this.blankmonths.push(10);
        if(!this.sentimentInfo.find(r=>r.month == month+2))
          this.blankmonths.push(11);
      }
    });
    
  }

}
