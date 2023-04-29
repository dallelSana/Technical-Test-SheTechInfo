import React, { useState, useEffect } from "react";
import axios from "axios";

interface Game {
  userId: number;
  game: string;
  playTime: number;
  genre: string;
  platforms: string[];
}

function TopGameList(): JSX.Element {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  useEffect(() => {
    async function fetchGames() {
      const url = `http://localhost:5000/select_top_by_playtime?genre=${selectedGenre}&platform=${selectedPlatform}`;
      const response = await axios.get<Game[]>(url);
      setGames(response.data);
    }
    fetchGames();
  }, [selectedGenre, selectedPlatform]);

  return (
    <div>
      <h2>Top Games</h2>
      <label>
        Genre:
        <input
          type="text"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        />
      </label>
      <label>
        Platform:
        <input
          type="text"
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Game</th>
            <th>Play Time</th>
            <th>Genre</th>
            <th>Platforms</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.userId}>
              <td>{game.userId}</td>
              <td>{game.game}</td>
              <td>{game.playTime}</td>
              <td>{game.genre}</td>
              <td>{game.platforms.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopGameList;
