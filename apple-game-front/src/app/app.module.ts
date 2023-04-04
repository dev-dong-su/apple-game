import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './share/service/in-memory-data.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { AppleDropComponent } from './components/main/apple-drop/apple-drop.component';
import { MainComponent } from './components/main/main.component';
import { AppleGameComponent } from './components/game/apple-game/apple-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AppleDropComponent,
    MainComponent,
    AppleGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
    JwtModule.forRoot({
      config: {
        allowedDomains: ['localhost:'],
        disallowedRoutes: ['http://example.com/auth/login'],
      },
    }),
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}
