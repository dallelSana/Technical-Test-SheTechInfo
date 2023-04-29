import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./App.css";

interface Game {
    id:number,
  userId: number;
  game: string;
  playTime: number;
  genre: string;
  platforms: string[];
}

const initialGame: Game = {
    id:0,
    userId: 0,
    game: '',
    playTime: 0, 
    genre:'',
    platforms: []
  };

function AddGame(): JSX.Element {
  const [inputData, setInputData] = useState<Game>(initialGame);
  const navigate = useNavigate();
  const [checkboxItems, setCheckboxItems] = useState([
    { id: 1, label: "PC", checked: false },
    { id: 2, label: "PS4", checked: false },
    { id: 3, label: "Android", checked: false },
    { id: 4, label: "XBOX", checked: false },
  ]);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post('http://localhost:5000/games', inputData)
      .then((res) => {
        alert('Game added successfully!');
        console.log(inputData);
        navigate('/');
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
      setInputData(prev => ({ ...prev, platforms: checkedLabels }));
    return updatedItems;
  });
};
    
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center ">
      <div id="myForm" className="w-50 border bg-light p-5">
        <h1>Add new Game</h1>
        <form  onSubmit={handleSubmit}>
          <div className="form-group row">
            <label  className="col-sm-2 col-form-label" htmlFor="userId">UserId :</label>
            <div className="col-sm-10">
              <input className='form-control ' 
                type="number" 
                name="userId" 
                onChange={(e) => setInputData({ ...inputData, userId: parseInt(e.target.value) })} 
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="game">Game :</label>
            <div className="col-sm-10">
              <input className='form-control' 
                type="text" 
                name="game" 
                onChange={(e) => setInputData({ ...inputData, game: e.target.value })} 
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="playTime">PlayTime :</label>
            <div className="col-sm-10">
              <input className='form-control'
                type="number"
                name="playTime"
                onChange={(e) => setInputData({ ...inputData, playTime: parseInt(e.target.value) })}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label" htmlFor="genre">Genre :</label>
            <div className="col-sm-10">
              <select className='form-control custom-select mr-sm-2' name="genre" id="genre" onChange={e=>setInputData({...inputData, genre: e.target.value})}>
                <option value="" selected>Choose...</option>
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
            <label className="col-sm-2 col-form-check-label" htmlFor="Platform">Platform :</label>
            <div className=" form-group  row">
              {checkboxItems.map((item) => (
                <div className= "col-3 text-align-left" key={item.id}>         
                  <input  className=" col-sm-2 col-form-check-input "
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
            <button className=' col-sm-2 btn btn-info' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGame;
