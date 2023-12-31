import * as express from 'express';
import * as cors from 'cors';
import { Request, Response} from 'express';

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // to parse request body with http header "content-type": "application/json"

app.get('/api/liveness', (req: Request, res: Response) => {
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
interface Score {
    hard: number;
    good: number;
    easy: number;
}

interface Flashcard {
    id?: number;
    question: string;
    answer: string;
}

interface FlashcardsDeck {
    id?: number;
    title: string;
    flashcards: Flashcard[];
    scores: Score;
}

let flashcardsDeck: FlashcardsDeck[] = [
    {
        id:1 ,
        title: 'Les 3 mousquetaires',
        flashcards: [
            {
                id: 1,
                question: 'Le premier ?',
                answer: 'Athos',
            },
            {
                id: 2,
                question: 'Le deuxieme ?',
                answer: 'Porthos',
            },
            {
                id: 3,
                question: 'Le troisieme',
                answer: 'Aramis',
            },
            {
                id: 4,
                question: 'Le heros ?',
                answer: 'D\'Artagnan',
            }
        ],
        scores: { hard: 0, good: 0, easy: 0}
    },
    {
    id: 2,
    title: 'Capitals',
    flashcards: [
        {id: 1, question: 'What is the capital of France?', answer: 'Paris',},
        {id: 2, question: 'What is the capital of Bhutan?', answer: 'Thimphu',},
        {id: 3, question: 'What is the capital of Suriname?', answer: 'Paramaribo',},
        {id: 4, question: 'What is the capital of Eritrea?', answer: 'Asmara',},
        {id: 5, question: 'What is the capital of Kyrgyzstan?', answer: 'Bishkek',},
        {id: 6, question: 'What is the capital of Vanuatu?', answer: 'Port Vila',},
        {id: 7, question: 'What is the capital of Lesotho?', answer: 'Maseru',},
        {id: 8, question: 'What is the capital of Djibouti?', answer: 'Djibouti',},
        {id: 9, question: 'What is the capital of Belize?', answer: 'Belmopan',},
        {id: 10, question: 'What is the capital of Andorra?', answer: 'Andorra la Vella',},
        {id: 11, question: 'What is the capital of Maldives?', answer: 'Malé',},
        {id: 12, question: 'What is the capital of Seychelles?', answer: 'Victoria',},
        {id: 13, question: 'What is the capital of Saint Kitts and Nevis?', answer: 'Basseterre',},
        {id: 14, question: 'What is the capital of San Marino?', answer: 'San Marino',},
        {id: 15, question: 'What is the capital of Comoros?', answer: 'Moroni',},
        {id: 16, question: 'What is the capital of Cape Verde?', answer: 'Praia',},
        {id: 17, question: 'What is the capital of Burundi?', answer: 'Gitega',},
        {id: 18, question: 'What is the capital of Guyana?', answer: 'Georgetown',},
        {id: 19, question: 'What is the capital of Liechtenstein?', answer: 'Vaduz',},
        {id: 20, question: 'What is the capital of Monaco?', answer: 'Monaco',},
    ],
    scores: { hard: 0, good: 0, easy: 0}
},
    {
        id:3 ,
        title: 'Largest Cities',
        flashcards: [
            {id: 1, question: 'What is the largest city in the world by population?', answer: 'Tokyo',},
            {id: 2, question: 'What is the largest city in the Americas by population?', answer: 'Mexico City',},
            {id: 3, question: 'What is the largest city in Africa by population?', answer: 'Lagos',},
            {id: 4, question: 'What is the largest city in Europe by population?', answer: 'Istanbul',},
            {id: 5, question: 'What is the largest city in Australia by population?', answer: 'Sydney',},
            {id: 6, question: 'What is the largest city in Antarctica by population?', answer: 'McMurdo Station',},
            {id: 7, question: 'What is the largest city in Asia by population?', answer: 'Tokyo',},
            {id: 8, question: 'What is the largest city in South America by population?', answer: 'Sao Paulo',},
            {id: 9, question: 'What is the largest city in North America by population?', answer: 'Mexico City',},
            {id: 10, question: 'What is the largest city in Oceania by population?', answer: 'Sydney',},
        ],
        scores: { hard: 0, good: 0, easy: 0}
    },
    {
        id: 4,
        title: 'Science Trivia',
        flashcards: [
            { id: 1, question: 'What is the largest planet in our solar system?', answer: 'Jupiter' },
            { id: 2, question: 'What is the chemical symbol for gold?', answer: 'Au' },
            { id: 3, question: 'What is the boiling point of water in degrees Celsius?', answer: '100 degrees Celsius' },
            { id: 4, question: 'What is the formula for calculating force?', answer: 'Force = Mass × Acceleration (F = ma)' },
            { id: 5, question: 'What is the process by which plants convert sunlight into chemical energy?', answer: 'Photosynthesis' },
            { id: 6, question: 'What is the unit of measurement for electric current?', answer: 'Ampere (A)' },
            { id: 7, question: 'Who proposed the theory of relativity?', answer: 'Albert Einstein' },
            { id: 8, question: 'What is the atomic number of carbon?', answer: '6' },
            { id: 9, question: 'What is the largest organ in the human body?', answer: 'Skin' },
            { id: 10, question: 'What is the SI unit for measuring frequency?', answer: 'Hertz (Hz)' },
        ],
        scores: { hard: 0, good: 0, easy: 0 }
    }
];


// GET endpoint to fetch all flashcards from a deck
app.get('/flashcardsDeck/:id/flashcards', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        res.send(deck.flashcards);
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});

// GET endpoint to fetch a single flashcard from a deck
app.get('/flashcardsDeck/:deckId/flashcards/:flashcardId', (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);
    const flashcardId = Number(req.params.flashcardId);
    const deck = flashcardsDeck.find(deck => deck.id === deckId);
    if (deck) {
        const flashcard = deck.flashcards.find(flashcard => flashcard.id === flashcardId);
        if (flashcard) {
            res.send(flashcard);
        } else {
            res.status(404).send({message: 'Flashcard not found'});
        }
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});

// POST endpoint to add a flashcard to a deck
app.post('/flashcardsDeck/:id/flashcards', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        let flashcard = <Flashcard> req.body;
        const lastFlashcardId = deck.flashcards[deck.flashcards.length - 1]?.id || 0;
        flashcard.id = lastFlashcardId + 1;
        deck.flashcards.push(flashcard);
        res.send(flashcard);
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});

// DELETE endpoint to remove a flashcard from a deck
app.delete('/flashcardsDeck/:deckId/flashcards/:flashcardId', (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);
    const flashcardId = Number(req.params.flashcardId);
    const deck = flashcardsDeck.find(deck => deck.id === deckId);
    if (deck) {
        const index = deck.flashcards.findIndex(flashcard => flashcard.id === flashcardId);
        if (index !== -1) {
            deck.flashcards.splice(index, 1);
            res.send({message: 'Flashcard deleted'});
        } else {
            res.status(404).send({message: 'Flashcard not found'});
        }
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});

// GET endpoint to fetch the scores of a deck
app.get('/flashcardsDeck/:id/scores', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        res.send(deck.scores);
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});

// PUT endpoint to update the score of a deck
app.put('/flashcardsDeck/:id/scores', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        const scores = <Score> req.body;
        deck.scores = scores;
        res.send(deck.scores);
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});
//PUT endpoint to update a flashcard
app.put('/flashcardsDeck/:deckId/flashcards/:flashcardId', (req: Request, res: Response) => {
    const deckId = Number(req.params.deckId);
    const flashcardId = Number(req.params.flashcardId);
    const deck = flashcardsDeck.find(deck => deck.id === deckId);
    if (deck) {
        const flashcard = deck.flashcards.find(flashcard => flashcard.id === flashcardId);
        if (flashcard) {
            Object.assign(flashcard, req.body);
            res.send(flashcard);
        } else {
            res.status(404).send({message: 'Flashcard not found'});
        }
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});
// POST endpoint to create a new deck
app.post('/flashcardsDeck', (req: Request, res: Response) => {
    let deck = <FlashcardsDeck> req.body;
    const lastDeckId = flashcardsDeck[flashcardsDeck.length - 1]?.id || 0;
    deck.id = lastDeckId + 1;
    deck.title = req.body.title;
    flashcardsDeck.push(deck);
    res.send(deck);
});

// GET endpoint to fetch all decks
app.get('/flashcardsDeck', (req: Request, res: Response) => {
    res.send(flashcardsDeck);
});
// GET endpoint to fetch a specific deck
app.get('/flashcardsDeck/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        res.send(deck);
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});

// PUT endpoint to update a specific deck
app.put('/flashcardsDeck/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deckIndex = flashcardsDeck.findIndex(deck => deck.id === id);
    if (deckIndex !== -1) {
        const updatedDeck = <FlashcardsDeck> req.body;
        updatedDeck.id = id; // Preserve the id
        updatedDeck.title = req.body.title;
        flashcardsDeck[deckIndex] = updatedDeck;
        res.send(updatedDeck);
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});

// DELETE endpoint to delete a specific deck
app.delete('/flashcardsDeck/:id', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deckIndex = flashcardsDeck.findIndex(deck => deck.id === id);
    if (deckIndex !== -1) {
        flashcardsDeck.splice(deckIndex, 1);
        res.send({message: 'Deck deleted'});
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});

// GET endpoint to fetch the title of a specific deck:
app.get('/flashcardsDeck/:id/title', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        res.send(deck.title);
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});

// PUT endpoint to update the title of a specific deck:
app.put('/flashcardsDeck/:id/title', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deck = flashcardsDeck.find(deck => deck.id === id);
    if (deck) {
        deck.title = req.body.title;
        res.send(deck.title);
    } else {
        res.status(404).send({message: 'Deck not found'});
    }
});

