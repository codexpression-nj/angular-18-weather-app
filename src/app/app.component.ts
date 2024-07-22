import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { Subscription, first } from 'rxjs';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgSwitch,NgSwitchCase,FormsModule,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
 
  title = 'angular-weather-app';
  cityName: any 
  city: any;
  temp: any;
  hum: any;
  wind: any;
  today: any;
  state :any;
  daysForecast: any;
  minTemp:any
  maxTemp:any
  // cityIllustrationPath: ansy;

  day1Name: string | undefined;
  day1State: string | undefined;
  day1Temp!: number;


  day2Name!: string;
  day2State!: string;
  day2Temp!: number;

  day3Name!: string;
  day3State!: string;
  day3Temp!: number;

  day4Name!: string;
  day4State!: string;
  day4Temp!: number;

  day5Name!: string;
  day5State!: string;
  day5Temp!: number;

  cityIllustrationPath = "assets/bg1.jpg"
  sub5: Subscription | undefined;

  errorMessage: any;
  constructor(private weatherService:WeatherService){}
 fetchWeather(city:string){
  console.log(city);
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const todayNumberInWeek = new Date().getDay();
  this.weatherService.getweather('pretoria').subscribe((play) => {
    console.log(play);
    
    this.cityName = play.name
    this.state = play.weather[0].main
    this.temp = Math.round(play.main.temp)
    this.maxTemp = play.main.temp_max
    this.minTemp = play.main.temp_min
    this.hum = play.main.humidity
    this.wind = play.wind.speed
    
    
  }, (err) =>{
    console.log(err);
    
  })
  this.sub5 = this.weatherService.getForcast('pretoria').pipe(first()).subscribe((data) => {
    
    for (let i = 0; i < data.length; i++) {
      const date = new Date(data[i].dt_txt).getDay();
      console.log(days[date]);
      if (((date === todayNumberInWeek + 1) || (todayNumberInWeek === 6 && date === 0)) && !this.day1Name) {
        this.day1Name = days[date];
        this.day1State = data[i].weather[0].main;
        this.day1Temp = Math.round(data[i].main.temp);

      } else if (!!this.day1Name && !this.day2Name && days[date] !== this.day1Name) {
        this.day2Name = days[date];
        this.day2State = data[i].weather[0].main;
        this.day2Temp = Math.round(data[i].main.temp);

      } else if (!!this.day2Name && !this.day3Name && days[date] !== this.day2Name) {
        this.day3Name = days[date];
        this.day3State = data[i].weather[0].main;
        this.day3Temp = Math.round(data[i].main.temp);

      } else if (!!this.day3Name && !this.day4Name && days[date] !== this.day3Name) {
        this.day4Name = days[date];
        this.day4State = data[i].weather[0].main;
        this.day4Temp = Math.round(data[i].main.temp);

      } else if (!!this.day4Name && !this.day5Name && days[date] !== this.day4Name) {
        this.day5Name = days[date];
        this.day5State = data[i].weather[0].main;
        this.day5Temp = Math.round(data[i].main.temp);

      }
    }
    
  })
 }

  ngOnInit() {
    
   

  }
  

}
