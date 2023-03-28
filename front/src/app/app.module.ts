import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { GameComponent } from './components/game/game.component';
import { AppleComponent } from './components/apple/apple.component';

@NgModule({
  declarations: [AppComponent, UserComponent, GameComponent, AppleComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
