import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpData {

  api_key: string = "66f80ac7fda4c2abf6d48436be4c70df";
  headers = new HttpHeaders().set('x-rapidapi-key',this.api_key).set('x-rapidapi-host', 'v3.football.api-sports.io');
  leagueID: number = 4; //euro championship
  seasonID: number = 2020; //latest season = 2020
  headersTeams = new HttpHeaders().set('x-rapidapi-key',this.api_key).set('x-rapidapi-host', 'v3.football.api-sports.io');

  constructor(private http:HttpClient) { }

  GetTeams():Observable<any>{
    return this.http.get("https://v3.football.api-sports.io/teams?league="+this.leagueID+"&season="+this.seasonID, {'headers':this.headers});
  }

  GetStandings(teamID: number):Observable<any>{
    return this.http.get("https://v3.football.api-sports.io/teams/statistics?league="+this.leagueID+"&season="+this.seasonID+"&team="+teamID, {'headers':this.headersTeams});
  }

}
