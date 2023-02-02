import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, delay, Observable, of} from "rxjs";
import {Geography} from "./data.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin' : 'http://localhost:4200'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http:HttpClient) { }

  public getAllDataByJson():Observable<any>{
    return this.http.get<any>('/assets/list-countries.json').pipe(
      // @ts-ignore
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          return of([]);
        }
      })
    );
  }


  /* No sale por Error de CORS en el servidor */
  private readonly HS_API_URL = 'https://websites.ladorianids.com/resources/prueba/list-countries.json'
  private header = new HttpHeaders;

  public getAllDataByExtAPI():Observable<any>{
    return this.http.get<any>(this.HS_API_URL);
  }
  /* ----- */
}
