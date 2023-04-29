import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface Game {
  id:number,
  userId: number;
  game: string;
  playTime: number;
  genre: string;
  platforms: string[];
}

function AllGames(): JSX.Element {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchGames() {
      const url = `http://localhost:5000/games?genre=${selectedGenre}&platform=${selectedPlatform}`;
      const response = await axios.get<Game[]>(url);
      setGames(response.data);
    }
    fetchGames();
    if (selectedSortOption === "Playtime") {
      const fetchGamesSortedByPlaytime = async () => {
        const response = await axios.get<Game[]>(
          `http://localhost:5000/select_top_by_playtime?genre=${selectedGenre}&platform=${selectedPlatform}`
        );
        setGames(response.data);
      };
    fetchGamesSortedByPlaytime();
    }
    if (selectedSortOption === "players") {
      const fetchGamesSortedByPlayers = async () => {
        const response = await axios.get<Game[]>(
          `http://localhost:5000/select_top_by_players?genre=${selectedGenre}&platform=${selectedPlatform}`
        );
        setGames(response.data);
      };
    fetchGamesSortedByPlayers();
    }
  }, [selectedGenre, selectedPlatform, selectedSortOption]);

function handleSubmit(id: number) {
  const conf = window.confirm('Do you want to delete ?');
  if (conf) {
    axios
      .delete(`http://localhost:5000/games/${id}`)
      .then(res => {
        alert('Game has been deleted');
        navigate('/');
      })
      .catch(err => console.log(err));
  }
}

return (
  <div className="container mt-5">
    <h1>List of Games</h1>
    <div className="container mt-4">
      <label>
        Sorted by:
        <select className='ms-2' value={selectedSortOption}
            onChange={(e) => setSelectedSortOption(e.target.value)}>
          <option  value="" ></option>
          <option  value="Playtime" >Playtime</option>
          <option  value="players">Players</option>
        </select>
      </label>
      <label className='ms-3'>
        Genre:
        <select className='ms-2' value={selectedGenre}  onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value=""></option>
          <option value="MOBA">MOBA</option>
          <option value="MMORPG">MMORPG</option>
          <option value="FPS">FPS</option>
          <option value="Card Game">Card Game</option>
          <option value="Sport">Sport</option>
          <option value="Multiplayer">Multiplayer</option>
        </select>
      </label>
      <label className='ms-3'>
        Platform:
        <select className='ms-2' value={selectedPlatform}  onChange={(e) => setSelectedPlatform(e.target.value)}>
          <option value=""></option>
          <option value="PC">PC</option>
          <option value="PS4">PS4</option>
          <option value="Android">Android</option>
          <option value="XBOX">XBOX</option>
        </select>
      </label>
    </div>
    <div className="container mt-3">
      <div className="text-end">
        <Link className="btn btn-primary" to="/create">Add +</Link>
      </div>
      <div >
        <table className="table">
          <thead>
            <tr>
              <th>UserId</th>
              <th>Game</th>
              <th>PlayTime</th>
              <th>Genre</th>
              <th>Platforms</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.userId}</td>
                <td>{game.game}</td>
                <td>{game.playTime}</td>
                <td>{game.genre}</td>
                <td>{game.platforms.join(", ")}</td>
                <td>
                  <Link className='btn btn-sm btn-success' to={`/update/${game.id}` }>Update</Link>
                  <button className='btn btn-sm ms-1 btn-danger' onClick={e => handleSubmit(game.id)}>Delete</button> 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div> 
);
}

export default AllGames;
