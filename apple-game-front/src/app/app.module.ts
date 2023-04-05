import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { AppleDropComponent } from './components/main/apple-drop/apple-drop.component';
import { MainComponent } from './components/main/main.component';
import { AppleGameComponent } from './components/game/apple-game/apple-game.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AppleDropComponent,
    MainComponent,
    AppleGameComponent,
    RankingComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule,
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}
