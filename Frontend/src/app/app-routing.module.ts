import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { DecksComponent } from './decks/decks.component';
import { DeckComponent } from './deck/deck.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'decks', component: DecksComponent },
  { path: 'deck/:id', component: DeckComponent },
  { path: '', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
