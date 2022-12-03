import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgModel } from '@angular/forms'
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  data!: string;

  constructor(private _storageservice: StorageService){}

  ngOnInit(){ }

  saveData(){
    this._storageservice.storeStockDetails(this.data);
  }
}
