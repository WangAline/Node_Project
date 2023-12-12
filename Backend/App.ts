import * as express from 'express';
import { Request, Response} from 'express';

const app = express();
app.use(express.json()); // => to parse request body with http header "content-type": "application/json"

app.get('/api/liveness', (req: Request, res: Response) => {
    res.send('Hello !!!');
});

console.log('starting...');
app.listen(3000, () => {
    console.log('Ok, started!');
});

// const express = require('express');    .... equivalent ... old-school
// .... does not work !!!     import express from 'express';

interface LearningPackage {
    id?: number;
    title: string;
    description?: string;
    targetAudience?: string;
    difficulty?: number;
}
let idGenerator = 1;
function newId() {
    return idGenerator++;
}
let learningPackages : LearningPackage[] = [
    {id: newId(), title: 'Learn TypeScript'},
    {id: newId(), title: 'Learn Angular'},
    {id: newId(), title: 'Learn NodeJs'},
    {id: newId(), title: 'Learn Express'},
];

app.get('/api/learning-package', (req: Request, res: Response) => {
    res.send(learningPackages);
});
app.post('/api/learning-package', (req: Request, res: Response) => {
    let item = <LearningPackage> req.body;
    console.log('handle http POST /api/learning-package', item);
    item.id = newId();
    learningPackages.push(item);
    res.send(item);
});
