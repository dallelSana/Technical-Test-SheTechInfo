import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./App.css";

interface Game {
    id:number,
  userId: number;
  game: string;
  playTime: number;
  genre: string;
  platforms: string[];
}

const EditGame = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Game>({
    id:0,
    userId: 0,
    game: '',
    playTime: 0, 
    genre:'',
    platforms: []
  });
  const navigat = useNavigate();

  useEffect(() => {
    axios
      .get<Game>(`http://localhost:5000/games/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);
  const [checkboxItems, setCheckboxItems] = useState([
    { id: 1, label: "PC", checked: false },
    { id: 2, label: "PS4", checked: false },
    { id: 3, label: "Android", checked: false },
    { id: 4, label: "XBOX", checked: false },
  ]);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/games/${id}`, data)
      .then((res) => {
        console.log(data);
        alert('Game updated successfully!');
        navigat('/');
      })
      .catch((err) => console.log(err));
  }
  const handleCheckboxChange = (itemId: number) => {
    setCheckboxItems(prev => {
      const updatedItems = prev.map(item => {
        if (item.id === itemId) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      const checkedLabels = updatedItems
        .filter(item => item.checked)
        .map(item => item.label);
      setData(prev => ({ ...prev, platforms: checkedLabels }));
      return updatedItems;
    });
  };
  
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center ">
      <div id="myForm" className="w-50 border bg-light p-5">
        <h1>Update Game</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label" htmlFor="userId">userId:</label>
          <div className="col-sm-10">
            <input className='form-control' 
              type="number" 
              name="userId" 
              value={data.userId} 
              onChange={(e) => setData({ ...data, userId: parseInt(e.target.value) })} 
            />
          </div>
        </div>
        <div className="form-group row">
          <label  className="col-sm-2 col-form-label" htmlFor="game">game:</label>
          <div className="col-sm-10">
            <input className='form-control' 
              type="text" 
              name="game" 
              value={data.game}  
              onChange={(e) => setData({ ...data, game: e.target.value })} 
            />
          </div>
        </div>
        <div className="form-group  row">
          <label className="col-sm-2 col-form-label" htmlFor="playTime">playTime:</label>
          <div className="col-sm-10">
            <input className='form-control'
              type="number"
              name="playTime"
              value={data.playTime}
              onChange={(e) => setData({ ...data, playTime: parseInt(e.target.value) })}
            />
          </div>
        </div>
        <div className="form-group  row">
          <label className="col-sm-2 col-form-label" htmlFor="genre">genre:</label>
          <div className="col-sm-10">
            <select className='form-control custom-select mr-sm-2' name="genre" id="genre" value={data.genre} onChange={(e) => setData({ ...data, genre: e.target.value })}>
              <option value="MOBA">MOBA</option>
              <option value="MMORPG">MMORPG</option>
              <option value="FPS">FPS</option>
              <option value="Card Game">Card Game</option>
              <option value="Sport">Sport</option>
              <option value="Multiplayer">Multiplayer</option>
            </select>
          </div>
        </div>          
        <div className=" form-group  row">
          <label className="col-sm-2 col-form-check-label" htmlFor="platform">Platforms:</label>
          <div className=" form-group  row">
            {checkboxItems.map((item) => (
              <div className= "col-3 text-align-left" key={item.id}>
                <input className=" col-sm-2 col-form-check-input "
                  value={data.platforms}
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.id)}
                />
                <label>{item.label}</label>
              </div>
            ))}
          </div>
        </div>	 
        <br />
        <div className=" form-group  row">
          <button className='col-sm-2 btn btn-info'>Update</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default EditGame;
