import { Component, OnInit } from '@angular/core';
import { FavouritesService } from '../favourites.service';
import { HttpData } from '../http.service';

@Component({
  selector: 'app-favourites-page',
  templateUrl: './favourites-page.page.html',
  styleUrls: ['./favourites-page.page.scss'],
})
export class FavouritesPagePage implements OnInit {

  teams : Array<any> = [];
  teamsIN: Array<any> = [];

  favouriteTeams: number[] = [];

  iterator: number = 0;
  iteratorJ: number = 0;

  constructor(private dataGrab: HttpData, private storageFav: FavouritesService) { }

  ngOnInit() {
    this.teamsIN = this.dataGrab.teams;
    this.storageFav.loadItem();
    this.favouriteTeams = this.storageFav.favouriteTeams;

    this.putToList();
  }

  removeItem(teamID: number){
    this.storageFav.removeItem(teamID);
    this.favouriteTeams = this.storageFav.favouriteTeams;
    this.teams = [];

    this.putToList();
  }

  putToList(){ //get favourite teams -> put into the teams list
    for (this.iterator = 0; this.iterator < this.teamsIN.length; this.iterator++){ //loop through all the teams
      console.log(this.favouriteTeams.length);
      for (this.iteratorJ = 0; this.iteratorJ < this.favouriteTeams.length; this.iteratorJ++){ //loop through each favourite team
        console.log(this.favouriteTeams[this.iteratorJ]);
        if (this.teamsIN[this.iterator].team.id == this.favouriteTeams[this.iteratorJ]){
          this.teams.push(this.teamsIN[this.iterator]);
          console.log(this.teams);
        }
      }

    }
  }

}
