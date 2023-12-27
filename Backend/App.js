"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // => to parse request body with http header "content-type": "application/json"
app.get('/api/liveness', (req, res) => {
    res.send('Hello !!!');
});
console.log('starting...');
app.listen(3000, () => {
    console.log('Ok, started!');
});
let idGenerator = 1;
function newId() {
    return idGenerator++;
}
let flashcardsDeck = [{
        id: 1,
        title: 'Capitals',
        flashcards: [
            {
                id: 1,
                question: 'What is the capital of France?',
                answer: 'Paris',
            },
            {
                id: 2,
                question: 'What is the capital of Bhutan?',
                answer: 'Thimphu',
            },
            {
                id: 3,
                question: 'What is the capital of Suriname?',
                answer: 'Paramaribo',
            },
            {
                id: 4,
                question: 'What is the capital of Eritrea?',
                answer: 'Asmara',
            },
            {
                id: 5,
                question: 'What is the capital of Kyrgyzstan?',
                answer: 'Bishkek',
            },
            {
                id: 6,
                question: 'What is the capital of Vanuatu?',
                answer: 'Port Vila',
            },
            {
                id: 7,
                question: 'What is the capital of Lesotho?',
                answer: 'Maseru',
            },
            {
                id: 8,
                question: 'What is the capital of Djibouti?',
                answer: 'Djibouti',
            },
            {
                id: 9,
                question: 'What is the capital of Belize?',
                answer: 'Belmopan',
            },
            {
                id: 10,
                question: 'What is the capital of Andorra?',
                answer: 'Andorra la Vella',
            },
            {
                id: 11,
                question: 'What is the capital of Maldives?',
                answer: 'Malé',
            },
            {
                id: 12,
                question: 'What is the capital of Seychelles?',
                answer: 'Victoria',
            },
            {
                id: 13,
                question: 'What is the capital of Saint Kitts and Nevis?',
                answer: 'Basseterre',
            },
            {
                id: 14,
                question: 'What is the capital of San Marino?',
                answer: 'San Marino',
            },
            {
                id: 15,
                question: 'What is the capital of Comoros?',
                answer: 'Moroni',
            },
            {
                id: 16,
                question: 'What is the capital of Cape Verde?',
                answer: 'Praia',
            },
            {
                id: 17,
                question: 'What is the capital of Burundi?',
                answer: 'Gitega',
            },
            {
                id: 18,
                question: 'What is the capital of Guyana?',
                answer: 'Georgetown',
            },
            {
                id: 19,
                question: 'What is the capital of Liechtenstein?',
                answer: 'Vaduz',
            },
            {
                id: 20,
                question: 'What is the capital of Monaco?',
                answer: 'Monaco',
            },
        ],
        scores: { again: 0, hard: 0, good: 0 }
    },
    {
        id: 2,
        title: 'Largest Cities',
        flashcards: [
            {
                id: 1,
                question: 'What is the largest city in the world by population?',
                answer: 'Tokyo',
            },
            {
                id: 2,
                question: 'What is the largest city in the Americas by population?',
                answer: 'Mexico City',
            },
            {
                id: 3,
                question: 'What is the largest city in Africa by population?',
                answer: 'Lagos',
            },
            {
                id: 4,
                question: 'What is the largest city in Europe by population?',
                answer: 'Istanbul',
            },
            {
                id: 5,
                question: 'What is the largest city in Australia by population?',
                answer: 'Sydney',
            },
            {
                id: 6,
                question: 'What is the largest city in Antarctica by population?',
                answer: 'McMurdo Station',
            },
            {
                id: 7,
                question: 'What is the largest city in Asia by population?',
                answer: 'Tokyo',
            },
            {
                id: 8,
                question: 'What is the largest city in South America by population?',
                answer: 'Sao Paulo',
            },
            {
                id: 9,
                question: 'What is the largest city in North America by population?',
                answer: 'Mexico City',
            },
            {
                id: 10,
                question: 'What is the largest city in Oceania by population?',
                answer: 'Sydney',
            },
        ],
        scores: { again: 0, hard: 0, good: 0 }
    },
];
// GET endpoint to fetch all flashcards from a deck
app.get('/flashcardsDeck/:id/flashcards', (req, res) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        res.send(deck.flashcards);
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
// GET endpoint to fetch a single flashcard from a deck
app.get('/flashcardsDeck/:deckId/flashcards/:flashcardId', (req, res) => {
    const deckId = Number(req.params.deckId);
    const flashcardId = Number(req.params.flashcardId);
    const deck = flashcardsDeck.find(deck => deck.id === deckId);
    if (deck) {
        const flashcard = deck.flashcards.find(flashcard => flashcard.id === flashcardId);
        if (flashcard) {
            res.send(flashcard);
        }
        else {
            res.status(404).send({ message: 'Flashcard not found' });
        }
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
// POST endpoint to add a flashcard to a deck
app.post('/flashcardsDeck/:id/flashcards', (req, res) => {
    var _a;
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        let flashcard = req.body;
        const lastFlashcardId = ((_a = deck.flashcards[deck.flashcards.length - 1]) === null || _a === void 0 ? void 0 : _a.id) || 0;
        flashcard.id = lastFlashcardId + 1;
        deck.flashcards.push(flashcard);
        res.send(flashcard);
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
// DELETE endpoint to remove a flashcard from a deck
app.delete('/flashcardsDeck/:deckId/flashcards/:flashcardId', (req, res) => {
    const deckId = Number(req.params.deckId);
    const flashcardId = Number(req.params.flashcardId);
    const deck = flashcardsDeck.find(deck => deck.id === deckId);
    if (deck) {
        const index = deck.flashcards.findIndex(flashcard => flashcard.id === flashcardId);
        if (index !== -1) {
            deck.flashcards.splice(index, 1);
            res.send({ message: 'Flashcard deleted' });
        }
        else {
            res.status(404).send({ message: 'Flashcard not found' });
        }
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
// GET endpoint to fetch the scores of a deck
app.get('/flashcardsDeck/:id/scores', (req, res) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        res.send(deck.scores);
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
// PUT endpoint to update the score of a deck
app.put('/flashcardsDeck/:id/scores', (req, res) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        const scores = req.body;
        deck.scores = scores;
        res.send(deck.scores);
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
//PUT endpoint to update a flashcard
app.put('/flashcardsDeck/:deckId/flashcards/:flashcardId', (req, res) => {
    const deckId = Number(req.params.deckId);
    const flashcardId = Number(req.params.flashcardId);
    const deck = flashcardsDeck.find(deck => deck.id === deckId);
    if (deck) {
        const flashcard = deck.flashcards.find(flashcard => flashcard.id === flashcardId);
        if (flashcard) {
            Object.assign(flashcard, req.body);
            res.send(flashcard);
        }
        else {
            res.status(404).send({ message: 'Flashcard not found' });
        }
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
// POST endpoint to create a new deck
app.post('/flashcardsDeck', (req, res) => {
    var _a;
    let deck = req.body;
    const lastDeckId = ((_a = flashcardsDeck[flashcardsDeck.length - 1]) === null || _a === void 0 ? void 0 : _a.id) || 0;
    deck.id = lastDeckId + 1;
    deck.title = req.body.title;
    flashcardsDeck.push(deck);
    res.send(deck);
});
// GET endpoint to fetch all decks
app.get('/flashcardsDeck', (req, res) => {
    res.send(flashcardsDeck);
});
// GET endpoint to fetch a specific deck
app.get('/flashcardsDeck/:id', (req, res) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        res.send(deck);
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
// PUT endpoint to update a specific deck
app.put('/flashcardsDeck/:id', (req, res) => {
    const id = Number(req.params.id);
    const deckIndex = flashcardsDeck.findIndex(deck => deck.id === id);
    if (deckIndex !== -1) {
        const updatedDeck = req.body;
        updatedDeck.id = id; // Preserve the id
        updatedDeck.title = req.body.title;
        flashcardsDeck[deckIndex] = updatedDeck;
        res.send(updatedDeck);
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
// DELETE endpoint to delete a specific deck
app.delete('/flashcardsDeck/:id', (req, res) => {
    const id = Number(req.params.id);
    const deckIndex = flashcardsDeck.findIndex(deck => deck.id === id);
    if (deckIndex !== -1) {
        flashcardsDeck.splice(deckIndex, 1);
        res.send({ message: 'Deck deleted' });
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
// GET endpoint to fetch the title of a specific deck:
app.get('/flashcardsDeck/:id/title', (req, res) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        res.send(deck.title);
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
// PUT endpoint to update the title of a specific deck:
app.put('/flashcardsDeck/:id/title', (req, res) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        deck.title = req.body.title;
        res.send(deck.title);
    }
    else {
        res.status(404).send({ message: 'Deck not found' });
    }
});
//# sourceMappingURL=App.js.map