import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID = ''; 

  constructor(private http:HttpClient) { }

  getweather(city:string): Observable<any>{
    return this.http.get(`${this.baseURL}${city}&units=metric&APPID=${this.appID}`).pipe((first()))
  }

  getForcast(city:string):  Subject<Array<any>> {
    const dataSubject = new Subject<Array<any>>();
    this.http.get(
      `${this.forcastURL}${city}&units=metric&APPID=${this.appID}`)
      .subscribe((weather: any) => {
        dataSubject.next(weather.list);
      });
    return dataSubject
  }

}
