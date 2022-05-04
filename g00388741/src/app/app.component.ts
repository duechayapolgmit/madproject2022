import { Component } from '@angular/core';
import { FavouritesService } from './favourites.service';
import { HttpData } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private dataGrab: HttpData, private storageFav: FavouritesService) {
    this.dataGrab.initialise();
    this.storageFav.loadItem();

  }
}
