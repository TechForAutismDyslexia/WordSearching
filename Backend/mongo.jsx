const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema
const gameSchema = new mongoose.Schema({
    gameId: String,
    tries: Number,
    timer: Number,
    status: Boolean
});

// Define a model
const Game = mongoose.model('Game', gameSchema);

// Define the API endpoint
app.post('/api/caretaker/sendgamedata', (req, res) => {
    const gameData = req.body;

    // Create a new game instance
    const newGame = new Game({
        gameId: gameData.gameId,
        tries: gameData.tries,
        timer: gameData.timer,
        status: gameData.status
    });

    // Save the game data to MongoDB
    newGame.save((err, savedGame) => {
        if (err) {
            return res.status(500).json({
                message: 'Error saving game data',
                error: err
            });
        }
        res.status(200).json({
            message: 'Game data saved successfully',
            gameData: savedGame
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
