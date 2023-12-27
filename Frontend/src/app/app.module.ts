import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { DecksComponent } from './decks/decks.component';
import { DeckComponent } from './deck/deck.component';
import {FlashcardsService} from "./flashcards.service";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DecksComponent,
    DeckComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
  ],
  providers: [ FlashcardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
