import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Openweather } from '../providers/openweather';
import {Addweather} from '../pages/addweather/addweather';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Addweather
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Addweather
  ],
  providers: [Openweather]
})
export class AppModule {}
