var express = require('express');
//var bodyParser = require('body-parser');
var app = express();
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()) 
const cors = require("cors");

const PORT = 5000;

// Data stored in memory for simplicity
let gamesData = [
  {
    id: 1,
    userId: 8,
    game: "League of legends",
    playTime: 500,
    genre: "MOBA",
    platforms: ["PC"],
  },
  {
    id:2,
    userId: 7,
    game: "World of warcraft",
    playTime: 1500,
    genre: "MMORPG",
    platforms: ["PC"],
  },
  {
    id:3,
    userId: 1,
    game: "The last of us 2",
    playTime: 100,
    genre: "FPS",
    platforms: ["PS4", "PC"],
  },
  {
    id:4,
    userId: 7,
    game: "Hearthstone",
    playTime: 1000,
    genre: "Card Game",
    platforms: ["PC"],
  },
  {
    id:5,
    userId: 7,
    game: "FIFA 2020",
    playTime: 2000,
    genre: "Sport",
    platforms: ["PC", "PS4", "XBOX"],
  },
  {
    id:6,
    userId: 2,
    game: "Among Us",
    playTime: 5000,
    genre: "Multiplayer",
    platforms: ["PC", "Android"],
  },
  {
    id:7,
    userId: 2,
    game: "Valorant",
    playTime: 2000,
    genre: "FPS",
    platforms: ["PC"],
  }
];

// Utilisez le middleware cors pour toutes les requêtes entrantes
app.use(cors());
// Retrieve all games
app.get("/games", (req, res) => {
  const genre = req.query.genre;
  const platform = req.query.platform;
  let filteredData = gamesData;
  if (genre) {
    filteredData = filteredData.filter((g) => g.genre === genre);
  }
  if (platform) {
    filteredData = filteredData.filter((g) => g.platforms.includes(platform));
  }
  //console.log("data =" + gamesData )
  res.json(filteredData); 
});

// Retrieve one game by id
app.get("/games/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const game = gamesData.find((g) => g.id === id);
  //console.log("data =" + gamesData )

  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

// Create a new game
app.post("/games", (req, res) => {
  // const game = req.body;
  // game.id = gamesData.length + 1
  //console.log("data =" + gamesData )
  const game = {
    id: gamesData.length + 1,
    userId: req.body.userId,
    game: req.body.game,
    playTime: req.body.playTime,
    genre: req.body.genre,
    platforms: req.body.platforms
}
//console.log("new data =" + game )
  gamesData.push(game);
  console.log(game)
  res.json(game);

});


// Update a game by id
app.put("/games/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const gameIndex = gamesData.findIndex((g) => g.id === id);

  if (gameIndex !== -1) {
    const updatedGame = { ...gamesData[gameIndex], ...req.body };
    gamesData[gameIndex] = updatedGame;
    res.json(updatedGame);
  } else {
    res.status(404).json({ message: "Game not found" });
  }
});

// Delete a game by id
app.delete("/games/:id", (req, res) => {
  const id = parseInt(req.params.id);
  gamesData = gamesData.filter((g) => g.id !== id);
  res.json({ message: "Game deleted" });
});

// Select top games by playtime and optional genre and platform filters
app.get("/select_top_by_playtime", (req, res) => {
  const genre = req.query.genre;
  const platform = req.query.platform;

  let filteredData = gamesData;
  if (genre) {
    filteredData = filteredData.filter((g) => g.genre === genre);
  }
  if (platform) {
    filteredData = filteredData.filter((g) => g.platforms.includes(platform));
  }

  filteredData.sort((a, b) => b.playTime - a.playTime);

  res.json(filteredData); // return top games by playtime
});

// Select top games by number of players and optional genre and platform filters
app.get("/select_top_by_players", (req, res) => {
  const genre = req.query.genre;
  const platform = req.query.platform;

  let filteredData = gamesData;
  if (genre) {
    filteredData = filteredData.filter((g) => g.genre === genre);
  }
  if (platform) {
    filteredData = filteredData.filter((g) => g.platforms.includes(platform));
  }

  filteredData.sort((a, b) => b.totalPlayers - a.totalPlayers);

  res.json(filteredData); // return top games by number of players
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
