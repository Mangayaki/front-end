import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Padrao from "../../componentes/Padrao";
import "./ViewG.css";
import { Age_rating, Kapi, Manga } from "../../componentes/Section";

const ViewG = () => {
  const location = useLocation();
  const [ViewG, SetViewG] = useState(null);


  useEffect(() => {
    // Verifique se há um ID de mangá na localização atual
    if (location.state && location.state.mangaId) {
      const mangaId = location.state.mangaId;
      console.log(mangaId);

      // Faça uma solicitação para obter os detalhes do mangá com o ID fornecido
      fetch(`https://kitsu.io/api/edge/manga/${mangaId}`)
        .then((response) => response.json())
        .then((data) => SetViewG(data.data))
        .catch((error) => console.error(error));
    }
  }, [location.state]);

  

  if (!ViewG) {
    return <div>Carregando...</div>;
  }

    //Função para criar uma lista de capítulos
    function createChapterList(numChapters: number): JSX.Element[] {
      const chapterList: JSX.Element[] = [];
      for (let i = 1; i <= numChapters; i++) {
        chapterList.push(<li key={i}>Capítulo {i}</li>);
      }
      return chapterList;
    }

  //Desestruturando atributos de mangá e fornecendo valores padrão
  const {
    attributes: {
      canonicalTitle,
      posterImage: { original },
      ageRating,
      synopsis,
      description,
      startDate,
      status,
      ageRatingGuide,
      chapterCount,
    },
  } = ViewG;
  
  return (
    <div>
      <Padrao />
      <div className="mangaview">
        <div className="descrition">
          <h1>{canonicalTitle}</h1>
          <ul>
            <li>Data de Inicio:{startDate}</li>
            <li>Status:{status}</li>
            <li>
              Gênero:
              {ageRatingGuide
                ? `${Age_rating[ageRatingGuide] || ageRatingGuide}`
                : "not found"}
            </li>
            <li>
              Classicação Etária:
              
            </li>
            {/* Adicione outros dados relevantes do mangá */}
          </ul>
          <img src={original} alt="capa do manga" />
          <p>
            {
              // Use a synopsis se a description estiver vazia
              description ? `${description}` : `${synopsis}`
            }
          </p>
        </div>
        <div className="captitulo">
          <h1>Capítulos</h1>
        </div>
        <div className="cap">
          <ul>
            {chapterCount !== undefined &&
              createChapterList(chapterCount)}

          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default ViewG;