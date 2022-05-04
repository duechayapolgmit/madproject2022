import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesPagePageRoutingModule } from './favourites-page-routing.module';

import { FavouritesPagePage } from './favourites-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritesPagePageRoutingModule
  ],
  declarations: [FavouritesPagePage]
})
export class FavouritesPagePageModule {}
