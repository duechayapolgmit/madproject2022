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
  teamsTemp: Array<any> = [];

  iterator: number = 0;
  iteratorJ: number = 0;

  //set up
  ngOnInit() {
    this.storageFav.loadItem();
    this.teamsTemp = this.dataGrab.teams;
    this.bubbleSort();
    this.teams = this.teamsTemp;
  }

  //sort by amount of times played
  temp: any;
  bubbleSort(){
    for (this.iterator = 0; this.iterator < this.teamsTemp.length - 1; this.iterator++){
      for (this.iteratorJ = 0; this.iteratorJ < this.teamsTemp.length - this.iterator - 1; this.iteratorJ++){
        if (this.teamsTemp[this.iteratorJ].fixtures.played.total < this.teamsTemp[this.iteratorJ+1].fixtures.played.total){
          
          this.temp = this.teamsTemp[this.iteratorJ];
          this.teamsTemp[this.iteratorJ] = this.teamsTemp[this.iteratorJ+1];
          this.teamsTemp[this.iteratorJ+1] = this.temp;
          this.temp = null;

        }

      }

    }
    
  }

  //add team to favourites list
  favAdd(teamID: number){
    this.storageFav.addItem(teamID);
  }
}
