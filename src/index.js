require('dotenv').config()
const express = require('express');

const playersRouter = require('./routes/players.route');

const app = express();
app.use(express.json());

app.use('/players', playersRouter)

const port = process.env.PORT ?? 3000;
app.listen(port, (...args) => {
  console.log(`Application started in http://localhost:${port}`);
});
