import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [ characterInfo, setCharacterInfo ] = useState();
  useEffect(() => {
    fetchCharacters(); 
  },[]);
  const fetchCharacters = async () => {
    const apiUrl = "https://narutodb.xyz/api/character";
    const res = await axios.get(apiUrl);
    console.log(res)
  }
  return (
    <div className="App">
      HelloNarutoWorld
    </div>
  );
}

export default App;
