import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpData } from '../http.service';
import { LoadingController } from '@ionic/angular';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  constructor(private dataGrab: HttpData, private loadingController: LoadingController, private geolocation: Geolocation) { }

  fixture: any = {
    teams:{
      home: {
        name: "",
        logo: ""
      },
      away: {
        name: "",
        logo: ""
      }
    },
    goals: {
      home: 0,
      away: 0
    }
  };
  teams : Array<any> = [];
  teamsTemp: Array<any> = [];
  localTeam: any = {
    fixtures: {
      draws: {
        total: 0
      },
      loses: {
        total: 0
      },
      played: {
        total: 0
      },
      wins: {
        total: 0
      }
    },
    team: {
      name: "Team not in Euro Championship or error loading location",
      logo: ""
    }

  };

  iterator: number = 0;
  iteratorJ: number = 0;

  //for geolocation
  latitude: any;
  longitude: any;
  success: any = function(pos){
    this.latitude = pos.coords.latitude;
    this.longitude = pos.coords.longitude;
  }
  country: string;

  async ngOnInit() {
    await this.presentLoading();
    this.getTopFive();
    

    await this.GetLocalTeam();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading',
      duration: 1000
    });
    await loading.present();

    this.fixture = await this.dataGrab.fixtures[0];

    await loading.present();

    this.GetLocation();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  //get the top five teams from the leaderboard (by wins)
  getTopFive(){
    this.teamsTemp = this.dataGrab.teams;
    this.bubbleSort();
    for (this.iterator = 0; this.iterator < 5; this.iterator++){
      this.teams[this.iterator] = this.teamsTemp[this.iterator];
    }
    
  }

  //sort by wins
  temp: any;
  bubbleSort(){
    for (this.iterator = 0; this.iterator < this.teamsTemp.length - 1; this.iterator++){
      for (this.iteratorJ = 0; this.iteratorJ < this.teamsTemp.length - this.iterator - 1; this.iteratorJ++){
        if (this.teamsTemp[this.iteratorJ].fixtures.wins.total < this.teamsTemp[this.iteratorJ+1].fixtures.wins.total){
          
          this.temp = this.teamsTemp[this.iteratorJ];
          this.teamsTemp[this.iteratorJ] = this.teamsTemp[this.iteratorJ+1];
          this.teamsTemp[this.iteratorJ+1] = this.temp;
          this.temp = null;

        }

      }

    }
    
  }

  //get location of the user
  async GetLocation(){
    this.geolocation.getCurrentPosition(this.success).then(
      (pos) => { 
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;
    }
    ).then(
      data => { //get location from latitude and longitude
        this.dataGrab.GetCountry(this.latitude, this.longitude).subscribe( info => {
          for (this.iterator = 0; this.iterator < info.results.length; this.iterator++){
            if (info.results[this.iterator].types[0] == 'country'){
              this.country = info.results[this.iterator].formatted_address;
              if (this.country == "Ireland") this.country = "Rep. of Ireland";
              break;
            }
          }
      }
        )
    })
  }

  async GetLocalTeam(){ //get the local team -- can cause errors due to the CORS policy
    for (this.iterator = 0; this.iterator < this.dataGrab.teams.length; this.iterator++){
      if (this.country == this.dataGrab.teams[this.iterator].team.name){
        this.localTeam = this.dataGrab.teams[this.iterator];
        break;
      }
        
    }
  }
}
