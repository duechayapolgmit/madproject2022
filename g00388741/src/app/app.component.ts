import { Component } from '@angular/core';
import { FavouritesService } from './favourites.service';
import { HttpData } from './http.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private dataGrab: HttpData, private storageFav: FavouritesService, private geolocation: Geolocation) {
    this.dataGrab.initialise();
    this.storageFav.loadItem();
  }



  

  
}
