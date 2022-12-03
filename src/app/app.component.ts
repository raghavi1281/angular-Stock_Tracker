import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  data: string = "";

  constructor(private _storageservice: StorageService){}

  ngOnInit(){
    //localStorage.setItem('name', JSON.stringify([]));
    this._storageservice.data.next("");
    
  }

  saveData(){
    this._storageservice.storeStockDetails(this.data);
    this._storageservice.data.next(this.data);
  }
}
