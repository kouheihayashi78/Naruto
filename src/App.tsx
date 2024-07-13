import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [characterInfo, setCharacterInfo] = useState([]);
  useEffect(() => {
    fetchCharacters();
  }, []);
  const fetchCharacters = async () => {
    const apiUrl = "https://narutodb.xyz/api/character";
    const res = await axios.get(apiUrl);
    setCharacterInfo(res.data.characters);
  };
  return (
    <div className="container">
      <main>
        <div className="cards-container">
          {characterInfo.map((character) => {
            return (
              <div className="card" key={character.id}>
                <img src={character.images[0] ?? "/dummy.png"} 
                  alt="character"
                  className="card-image"
                  />
                <div className="card-content">
                  <h3 className="card-title">{character.name}</h3>
                  <p className="card-description">{character.debut?.appearsIn ?? 'なし'}</p>
                  <div className="card-footer">
                    <span className="affiliation">
                      {character.personal?.affiliation ?? 'なし'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
