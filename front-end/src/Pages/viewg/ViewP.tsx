import React, { useEffect, useState } from "react";
import Footer from "../../componentes/Footer";
import Padrao from "../../componentes/Padrao";
import "./ViewG.css";

function ViewP() {
  const [, setMangaPrince] = useState([]);

  useEffect(() => {
    fetch("https://kitsu.io/api/edge/manga/?page[limit]=1&page[offset]=127}")
      .then((response) => response.json())
      .then((response) => setMangaPrince(response.data));
  });

  // Função para criar lista de capítulos
  function createChapterList(numChapters: number): JSX.Element[] {
    const chapterList: JSX.Element[] = [];
    for (let i = 1; i <= numChapters; i++) {
      chapterList.push(<li key={i}>Capítulo {i}</li>);
    }
    return chapterList;
  }
  

  return (
    <div>
      <Padrao />
      <div className="mangaview">
        <div className="descrition">
          <h1>Prince of Tennis</h1>
          <ul>
            <li><h4>⠀⠀Tags:</h4></li><li>⠀ esporte⠀</li><li id="invisible"></li><li>⠀⠀⠀ação</li>
          </ul>
          <img alt="capa do manga" src="https://media.kitsu.io/manga/128/poster_image/medium-494e4b2f4ad645d0e4267f7f9b0d0857.jpeg"></img>
          <p>Ryoma Echizen just joined the Seishun Academy's tennis team, which is known for being one of the most competitive teams in Japan.
            Its members are incredibly talented, gifted, and athletic. With rigorous and extremely intense practices, the upperclassmen of the team expect the very best from
            themselves and they expect even more from the new members of the team." </p>
        </div>
        <div className="captitulo"> 
          <h1> Capítulos</h1>
        </div>
        <div className="cap">
          <ul>
           {createChapterList(50)} {/* Chama a função para criar lista de capítulos com 10 itens */}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewP;
