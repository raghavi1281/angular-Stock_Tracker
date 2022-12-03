import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinnhubapiService } from '../services/finnhubapi.service';
import { ISentiment } from '../Interfaces/ISentiment';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css']
})
export class SentimentComponent implements OnInit {
  stockSymbol!: string;
  sentimentInfo!: ISentiment[];
  constructor(private route: ActivatedRoute, private _apiservice:FinnhubapiService) { }

  ngOnInit(): void {
    let name = this.route.snapshot.paramMap.get('symbol');
    this.stockSymbol = name? name:"";

    this._apiservice.getSentiment(this.stockSymbol).subscribe(data=>{
      this.sentimentInfo = data;
    })
  }

}
