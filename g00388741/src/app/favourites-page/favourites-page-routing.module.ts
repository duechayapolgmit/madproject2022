import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavouritesPagePage } from './favourites-page.page';

const routes: Routes = [
  {
    path: '',
    component: FavouritesPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavouritesPagePageRoutingModule {}
