import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinnhubapiService } from '../services/finnhubapi.service';
import { StorageService } from '../services/storage.service';
import { ISentiment } from '../Interfaces/ISentiment';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styles: []
})
export class SentimentComponent implements OnInit {
  stockSymbol!: string;
  stockName!: string;
  sentimentInfo!: ISentiment[];
  blankmonths: number[] = [];
  constructor(private route: ActivatedRoute, private _apiservice:FinnhubapiService, private _storageservice: StorageService) { }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('symbol');
    this.stockSymbol = name? name:"";

    if(typeof(this._storageservice.symbolNames.get(this.stockSymbol)))
    {
      this.stockName = this._storageservice.symbolNames.get(this.stockSymbol)!;
    }

    this._apiservice.getSentiment(this.stockSymbol).subscribe(data=>{
      this.sentimentInfo = data;
      if(this.sentimentInfo.length<3)
      {
        let i = this.sentimentInfo[this.sentimentInfo.length -1].month;
          this.blankmonths.push(i+1);
      } 
    });
    
  }

}
