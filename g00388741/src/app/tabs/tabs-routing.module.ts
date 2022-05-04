import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'leaderboard',
        loadChildren: () => import('../leaderboard/leaderboard.module').then(m => m.LeaderboardPageModule)
      },
      { 
        path: 'fixtures',
        loadChildren: () => import('../fixtures/fixtures.module').then(m => m.FixturesPageModule)
      },
      {
        path: 'favourites',
        loadChildren: () => import('../favourites-page/favourites-page.module').then(m => m.FavouritesPagePageModule)
      },
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
