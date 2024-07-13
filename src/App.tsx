import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const limit = 20;

interface Character {
  id: number;
  name: string;
  images: string[];
  debut?: {
    appearsIn?: string;
  };
  personal?: {
    affiliation?: string;
  }
}

function App() {
  const [characterInfo, setCharacterInfo] = useState<Character[]>([]);
  const [pagerNum, setPagerNum] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCharacters(pagerNum);
  }, [pagerNum]);

  // ナルトdbからデータを非同期で取得する処理
  const fetchCharacters = async (page: number): Promise<void> => {
    setIsLoading(true);
    const apiUrl = "https://narutodb.xyz/api/character";
    try {
      const res = await axios.get(apiUrl, { params: {page, limit} });
      setCharacterInfo(res.data.characters);
      
    } catch (error) {
      console.error("API通信中にエラーが起きました。", error)
    } finally {
      setIsLoading(false);
    }
  };

  // 次のページに切り替わるページャー
  const nextPager = () => {
    setPagerNum(pagerNum + 1)
  }

  // 前のページに切り替わるページャー
  const prevPager = () => {
    setPagerNum(pagerNum - 1)
  };
  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <img src="logo.png" alt="logo" className="logo" />
        </div>
      </div>
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
            <button className="prev" onClick={prevPager} disabled={pagerNum === 1}>Previous</button>
            <span className="page-number">{pagerNum}</span>
            <button className="next" onClick={nextPager} disabled={limit > characterInfo.length}>Next</button>
          </div>
        </main>
      }
    </div>
  );
}

export default App;
