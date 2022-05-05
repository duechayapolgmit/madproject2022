import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favouriteTeams: number[] = [];
  iterator: number = 0;

  change: number = 1;

  constructor(private storage: Storage, private alertController: AlertController) { 
    this.favouriteTeams = [];

  }

  /* ALERTS FOR ADDING/REMOVING FAVOURITES */
  async presentAlert(){
    const alert  = await this.alertController.create( {
      header: 'ERROR',
      message: 'Team is already on the Favourites list.',
      buttons: ['OK']
    })

    await alert.present();
  }

  async presentAddSuccess(){
    const alert  = await this.alertController.create( {
      header: 'SUCCESS',
      message: 'Team has been put into the Favourites list.',
      buttons: ['OK']
    })

    await alert.present();
  }

  async presentRemoveSuccess(){
    const alert  = await this.alertController.create( {
      header: 'SUCCESS',
      message: 'Team has been removed from the Favourites list.',
      buttons: ['OK']
    })

    await alert.present();
  }

  //add team to the favourites list
  addItem(teamID: number){
    if (this.favouriteTeams == null) this.favouriteTeams = []; //for the for loop below

    //check if team in the favourites list or not
    for (this.iterator = 0; this.iterator < this.favouriteTeams.length; this.iterator++){
      if (teamID == this.favouriteTeams[this.iterator]){
        this.presentAlert();
        return;
      }
    }

    //add teamID to array
    if (this.favouriteTeams == null) this.favouriteTeams = [teamID]; //if nothing in the array
    else this.favouriteTeams.push(teamID);

    this.change = 1;
    this.presentAddSuccess();
    this.saveItem();
  }

  //remove team from the favourites list
  removeItem(teamID: number){
    if (this.favouriteTeams == null) this.favouriteTeams = []; //for the for loop below

    //check if team in the favourites list or not
    for (this.iterator = 0; this.iterator < this.favouriteTeams.length; this.iterator++){
      if (teamID == this.favouriteTeams[this.iterator]){
        this.favouriteTeams.splice(this.iterator, 1);
      }
    }

    this.change = 1;
    this.presentRemoveSuccess();
    this.saveItem();
  }

  //saves and creates storage for item saving
  saveItem(){
    
    this.storage.create().then( () => {this.storage.set("favouriteTeams",this.favouriteTeams)});
  }

  //load item from storage
  loadItem(){
    this.storage.create().then( () => {this.storage.get('favouriteTeams').then( data => {
      this.favouriteTeams = data 
    })});
    
  }
}
