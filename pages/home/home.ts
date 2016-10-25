import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { Geolocation } from 'ionic-native';
import { Openweather } from '../../providers/openweather';
import {Addweather} from '../addweather/addweather';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map
  marker
  infowin
  localWeather;
  contentInfo;
  weatherList= [];
  city: string;
    seoul = {"coord":{"lon":126.98,"lat":37.57},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":277.296,"pressure":1010.9,"humidity":88,"temp_min":277.296,"temp_max":277.296,"sea_level":1034.66,"grnd_level":1010.9},"wind":{"speed":1.22,"deg":57.5031},"clouds":{"all":0},"dt":1477249121,"sys":{"message":0.0127,"country":"KR","sunrise":1477172920,"sunset":1477212199},"id":1835848,"name":"Seoul","cod":200};
  chicago= {"coord":{"lon":-87.65,"lat":41.85},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":289.821,"pressure":1003.04,"humidity":86,"temp_min":289.821,"temp_max":289.821,"sea_level":1025.22,"grnd_level":1003.04},"wind":{"speed":4.77,"deg":231.003},"clouds":{"all":0},"dt":1477249207,"sys":{"message":0.0094,"country":"US","sunrise":1477224823,"sunset":1477263306},"id":4887398,"name":"Chicago","cod":200};
  constructor(public navCtrl: NavController, public weather: Openweather,public modalCtrl : ModalController) {
   this.ionViewDidEnter();
  }


  ionViewDidEnter(){
    Geolocation.getCurrentPosition().then (	(resp) => {
      console.log(resp.coords.latitude);
      console.log(resp.coords.longitude);
      this.weather.getWeatherByLocation(resp.coords.latitude, resp.coords.longitude)
      .map(data => data.json())
      .subscribe( (data) => {
          this.localWeather = data;
      });

      this.map = new google.maps.Map(document.getElementById( 'map'),
                                    { zoom:15, center: {lat:resp.coords.latitude, lng: resp.coords.longitude},
                                      mapTypeId: google.maps.MapTypeId.ROADMAP } );

      this. marker= new google.maps.Marker( {
        map: this.map,
        position: this.map.getCenter(),
        animation: google.maps.Animation.DROP
      });

      let infowin = new google.maps.InfoWindow( {
        content: "Location"
      });

      google.maps.event.addListener(this.marker, 'click', () => {
        this.infowin.setContent(
          '<h3> <img src=' + '\"' + 
          'http://openweathermap.org/img/w/' + 
          this.localWeather.weather[0].icon + '.png' + '\"' +'height=50>' +
          this.localWeather.name + '<br> <h4 align=center> Temp: ' + 
          this.localWeather.main.temp + 'ºC' +
          '<br>H: ' + this.localWeather.main.temp_max +
           'ºC' + '/ L: ' + 
           this.localWeather.main.temp_min + 'ºC' + '</h4>');

        infowin.open(this.map, this.marker);
      });


    });
  }
    onClick() {
     let m = this.modalCtrl.create(Addweather);
     m.onDidDismiss( (data) => {
       this.getWeather(data.city, data.country);
       console.log(this.weatherList);

     })
     m.present();
  }
    getWeather( city: string, country:string ) {
    this.weather.getWeatherByCity(city, country )
    .map( data => data.json() )
    .subscribe(
      data=> {
        this.weatherList.push(data);
      });
    }
    cityChanged() {
  
        if(this.map) this.map.showWeatherMap(this.weatherList);
        console.log(this.weatherList);
       
}
  showWeatherMap(weather) {
    let loc = {lat: weather.coord.lat, lng: weather.coord.lon};
    this.map.setCenter(loc);
    this.marker.setPosition(loc);

    let content = `
    <ion-grid>
      <ion-row>
        <ion-col>
          <ion-thumbnail item-left>
            <img src = \"http://openweathermap.org/img/w/`
              +weather.weather[0].icon+`.png\" height=50>
          </ion-thumbnail>
          </ion-col>
          <ion-col>
            <p>`+weather.main.temp+`</p>
          </ion-col>
      </ion-row>
      <ion-row>
          <p>`+weather.name+`</p>
      </ion-row>
      <ion-row>
          <p> Low: `+weather.main.temp_min+` High: `+weather.main.temp_max+`</p>
      </ion-row>
    </ion-grid>`;
    this.infowin.setContent( content );
  }
  


}