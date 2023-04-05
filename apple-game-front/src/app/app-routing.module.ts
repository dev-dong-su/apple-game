import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from '@components/game/game.component';
import { MainComponent } from './components/main/main.component';
import { RankingComponent } from './components/ranking/ranking.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  { path: 'game', component: GameComponent },
  { path: 'ranking', component: RankingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
