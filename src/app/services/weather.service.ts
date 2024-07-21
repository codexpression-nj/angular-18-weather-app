import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, map, retry } from 'rxjs';
import { environment } from '../../environments/environment.development';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  private readonly forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  private readonly appID = ''; 

  constructor(private http:HttpClient) { }

  getweather(city:string):  Subject<Array<any>>{
    const dataSubject = new Subject<Array<any>>();

     this.http.get(`${this.baseURL}${city}&units=metric&APPID=${this.appID}`).subscribe((weather:any) => {
      dataSubject.next(weather)
    })
    return dataSubject
  }

  getForcast(city:string):  Subject<Array<any>> {
    const dataSubject = new Subject<Array<any>>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${this.appID}`)
      .subscribe((weather: any) => {
        dataSubject.next(weather.list);
      });
    return dataSubject
  }

}
