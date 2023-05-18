import React, { useEffect, useState } from "react";
import Footer from "../../componentes/Footer";
import Padrao from "../../componentes/Padrao";
import "./ViewG.css";

interface MangaData{
  id:number;
  attributes:{
    chapterCount:number;
  };
}


function ViewP() {
  const [mangaPrince, setMangaPrince] = useState<MangaData | null>(null);

  useEffect(() => {
    fetch("https://kitsu.io/api/edge/manga/?page[limit]=1&page[offset]=127}")
      .then((response) => response.json())
      .then((response) => setMangaPrince(response.data[0]));
  });

  // Função para criar lista de capítulos
  function createChapterList(numChapters: number): JSX.Element[] {
    const chapterList: JSX.Element[] = [];
    for (let i = 1; i <= numChapters; i++) {
      chapterList.push(<li key={i}>Capítulo {i}</li>);
    }
    return chapterList;
  }
  
  if(!mangaPrince){
    return<div>Loading...</div>;
  }

  const{ chapterCount } = mangaPrince.attributes;

  return (
    <div>
      <Padrao />
      <div className="mangaview">
        <div className="descrition">
          <h1>Prince of Tennis</h1>
          <ul>
            <li><h4>⠀⠀Tags:</h4></li><li>⠀ esporte⠀</li><li id="invisible"></li><li>⠀⠀⠀ação</li>
          </ul>
          <img alt="capa do manga" src="https://media.kitsu.io/manga/poster_images/14916/original.jpg"></img>
          <p>Ryoma Echizen just joined the Seishun Academy's tennis team, which is known for being one of the most competitive teams in Japan.
            Its members are incredibly talented, gifted, and athletic. With rigorous and extremely intense practices, the upperclassmen of the team expect the very best from
            themselves and they expect even more from the new members of the team." </p>
        </div>
        <div className="captitulo"> 
          <h1> Capítulos</h1>
        </div>
        <div className="cap">
          <ul>
           {createChapterList(chapterCount)} {/* Chama a função para criar lista de capítulos com 50 itens */}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewP;
