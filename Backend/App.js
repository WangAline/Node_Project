"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
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
let learningPackages = [
    { id: newId(), title: 'Learn TypeScript' },
    { id: newId(), title: 'Learn Angular' },
    { id: newId(), title: 'Learn NodeJs' },
    { id: newId(), title: 'Learn Express' },
];
app.get('/api/learning-package', (req, res) => {
    res.send(learningPackages);
});
app.post('/api/learning-package', (req, res) => {
    let item = req.body;
    console.log('handle http POST /api/learning-package', item);
    item.id = newId();
    learningPackages.push(item);
    res.send(item);
});
//# sourceMappingURL=App.js.map