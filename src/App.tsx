import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [characterInfo, setCharacterInfo] = useState([]);
  const [pagerNum, setPagerNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCharacters(pagerNum);
  }, [pagerNum]);
  const fetchCharacters = async (page) => {
    setIsLoading(true);
    const apiUrl = "https://narutodb.xyz/api/character";
    const res = await axios.get(apiUrl, { params: {page} });
    setCharacterInfo(res.data.characters);
    setIsLoading(false);
  };
  const nextPager = () => {
    setPagerNum(parseInt(pagerNum) + 1)
  }

  const prevPager = (e) => {
    setPagerNum(parseInt(pagerNum) - 1)
  };
  return (
    <div className="container">
      {isLoading ? <h3>Now Loading...</h3> :
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
          <div className="pager">
            <button className="prev" onClick={prevPager}>Previous</button>
            <span className="page-number">{pagerNum}</span>
            <button className="next" onClick={nextPager}>Next</button>
          </div>
        </main>
      }
    </div>
  );
}

export default App;
