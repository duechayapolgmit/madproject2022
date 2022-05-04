import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpData {

  constructor(private http:HttpClient) { }

  //headers and api keys for http
  api_key: string = "66f80ac7fda4c2abf6d48436be4c70df";
  headers = new HttpHeaders().set('x-apisports-key',this.api_key).set('x-rapidapi-host', 'v3.football.api-sports.io');
  leagueID: number = 4; //euro championship
  seasonID: number = 2020; //latest season = 2020

  //fields
  teams: Array<any> = [];
  favTeamsOption: Array<Number> = [];
  favTeamsInfo: Array<String> = [];
  fixtures: Array<String> = [];

  iterator: number = 0;
  initialiseCheck: number = 0;

  initialise() {
    if (this.initialiseCheck == 0){
      this.GetTeams().subscribe( info => {
        
        for (this.iterator = 0;this.iterator < info.response.length; this.iterator++) 
        {
          this.GetStandings(info.response[this.iterator].team.id).subscribe ( infoStats =>
            {
            this.teams.push(infoStats.response);
          })
        }
        
      }
      )
      this.GetFixtures().subscribe( info => {
        //get the latest 10 teams
        for (this.iterator = info.response.length-1; this.iterator > info.response.length-11; this.iterator--){
          this.fixtures.push(info.response[this.iterator]);
        }
      })
    }
  }

  GetTeams():Observable<any>{
    return this.http.get("https://v3.football.api-sports.io/teams?league="+this.leagueID+"&season="+this.seasonID, {'headers':this.headers});
  }

  //this following code may fail to run as there were CORS error policy throughout (possibly due to the structure of the API)
  GetStandings(teamID: number):Observable<any>{
    return this.http.get("https://v3.football.api-sports.io/teams/statistics?league="+this.leagueID+"&season="+this.seasonID+"&team="+teamID, {'headers':this.headers});
  }

  GetFixtures():Observable<any>{
    return this.http.get("https://v3.football.api-sports.io/fixtures?league="+this.leagueID+"&season="+this.seasonID+"&timezone=Europe/London", {'headers':this.headers});
  }

  GetCountry(lat:number, long:number):Observable<any>{
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyAzB8UeZVauyl697z1l9v9FJIO2ICNABuE")
  }
}
