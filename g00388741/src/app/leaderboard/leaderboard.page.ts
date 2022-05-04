import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { initialize } from '@ionic/core';
import { FavouritesService } from '../favourites.service';
import { HttpData } from '../http.service';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  constructor(private dataGrab: HttpData, private storageFav: FavouritesService) {
    
  }
  
  teams : Array<any> = [];

  ngOnInit() {
    this.storageFav.loadItem();
    this.teams = this.dataGrab.teams;
  }

  favAdd(teamID: number){
    this.storageFav.addItem(teamID);
  }
}
