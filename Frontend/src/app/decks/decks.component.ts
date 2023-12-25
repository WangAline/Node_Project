import { Component, OnInit } from '@angular/core';
import { DecksService } from '../decks.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
})
export class DecksComponent implements OnInit {
  decks: any[] = [];

  constructor(private decksService: DecksService) { }

  ngOnInit(): void {
    this.decksService.getDecks().subscribe(decks => {
      console.log('Fetched decks:', decks); // log fetched decks
      this.decks = decks;
    });
  }

  addDeck() {
    this.decksService.addDeck().subscribe(deck => {
      this.decks.push(deck);
    });
  }

  removeDeck(id: number) {
    this.decksService.removeDeck(id).subscribe(() => {
      this.decks = this.decks.filter(deck => deck.id !== id);
    });
  }
}
