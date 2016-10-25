import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
  Generated class for the Addweather page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-addweather',
  templateUrl: 'addweather.html'
})
export class Addweather {
  data: {city:string, country:string} = {city:'', country:''}

  constructor(public view: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello Addweather Page');
  }

  dismiss() {
    console.log('dismiss');
    this.view.dismiss();
  }
  select() {
    console.log(this.data.city);
    console.log(this.data.country);
    this.view.dismiss(this.data);
  }
}
