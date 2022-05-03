import { Component, OnInit } from '@angular/core';
import { HttpData } from '../http.service';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  constructor(private dataGrab: HttpData) {
    
  }
  
  teams : Array<String>;
  teamsStats: Array<String> = [];

  iterator: number = 0;

  ngOnInit() {
    this.dataGrab.GetTeams().subscribe( info => {
      console.log(info);
      for (this.iterator = 0;this.iterator < 1; this.iterator++) 
      {
        console.log('hey');
        this.dataGrab.GetStandings(info.response[this.iterator].team.id).subscribe ( infoStats =>
          {
          this.teamsStats.push(infoStats);
          })
      }
      console.log(this.teamsStats);
      //this.teams = info.data[0].season_id
     // this.initialiseComponent();
    })
  }
 /* initialiseComponent(){
    console.log(this.seasonID);
    this.dataGrab.GetStandings(this.seasonID).subscribe( info => {
      this.teams = info.data.standings;
      console.log(this.teams); })
    ;
  }*/

}
