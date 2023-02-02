import {Component, OnInit} from '@angular/core';
import {ApiService} from "../service/api.service";
import {HttpClient} from "@angular/common/http";
import {Geography} from "../service/data.model";
import {BehaviorSubject, debounceTime, distinctUntilChanged, filter, map, Observable, switchMap, tap} from "rxjs";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  queryField = new FormControl();
  filter: FormControl | undefined;
  filter$: Observable<string> | undefined;

  geography:Geography[] = [];
  geoContinents:string[] = [];

  p: number = 1;
  countOnPage: number = 20;

  constructor(private api:ApiService, private http: HttpClient, public selectedContinent:FormBuilder) {}

  ngOnInit():void{
    console.log('Test');
    this.getAllData();
    this.api.getAllDataByJson().subscribe(details => { (this.geoContinents = this.getContinent(details))});
  }


  getAllData(){
    this.api.getAllDataByJson().subscribe(res=>{
      this.geography=res;
    });
  }

  countryFilter(searchString: string) {
    if (searchString == "") {
      this.getAllData();
    } else {
      this.api.getAllDataByJson().subscribe(res=>{
        this.geography=res;
        this.geography = this.geography.filter(item =>
          item.country.toLowerCase().includes(searchString.toLowerCase())
        );
      });
    }
  }

  continentFilter(searchString: string) {
    if (searchString == "0") {
      this.getAllData();
    }
    else {
      this.api.getAllDataByJson().subscribe(res=>{
        this.geography=res;
        this.geography = this.geography.filter(item =>
          item.continent.toLowerCase().includes(searchString.toLowerCase())
        );
      });
    }
  }

  getContinent(items: { country: string, continent: string}[]) {
    const set = new Set<string>();
    items.forEach(item => (set.add(item.continent)));
    return Array.from(set);
  }
}
