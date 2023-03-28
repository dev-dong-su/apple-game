import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { GameComponent } from './components/game/game.component';
import { AppleDropComponent } from './components/apple/apple-drop/apple-drop.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    GameComponent,
    AppleDropComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
