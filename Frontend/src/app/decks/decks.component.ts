import { Component, OnInit } from '@angular/core';
import { FlashcardsService } from '../flashcards.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
})
export class DecksComponent implements OnInit {
  decks: any[] = [];
  newDeckTitle = '';


  constructor(private flashcardsService: FlashcardsService) { }

  ngOnInit(): void {
    this.flashcardsService.getDecks().subscribe(decks => {
      console.log('Fetched decks:', decks);
      this.decks = decks;
    });
  }

  addDeck() { // add a new empty deck when the user clicks on the "Add" button
    if (this.newDeckTitle.trim()) {
      this.flashcardsService.addDeck(this.newDeckTitle).subscribe((deck: any) => {
        this.decks.push(deck);
        this.newDeckTitle = '';
      });
    }
  }

  removeDeck(id: number) { // remove the deck when the user clicks on the "Remove" button
    this.flashcardsService.removeDeck(id).subscribe(() => {
      this.decks = this.decks.filter(deck => deck.id !== id);
    });
  }
}
