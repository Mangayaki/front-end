import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Padrao from "../../componentes/Padrao";
import starv from '../../componentes/imagens/star1.png';
import starc from '../../componentes/imagens/star.png';
import "./ViewG.css";
import { Age_rating, Kapi } from "../../componentes/Section";

const ViewG = () => {
  const location = useLocation();
  const [ViewG, SetViewG] = useState(null);
  const [favorito, setFavorito] = useState(false);

  //botao de favorito, mudar estrela para preenchida
  const handleClick = () => {
    setFavorito(!favorito);
  }

  useEffect(() => {
    if (location.state && location.state.mangaId) { // Verifique se há um ID de mangá na localização atual
      const mangaId = location.state.mangaId;
      fetch(`${Kapi}/manga/${mangaId}`)            // Faça uma solicitação para obter os detalhes do mangá com o ID fornecido
        .then((response) => response.json())
        .then((data) => SetViewG(data.data))
        .catch((error) => console.error(error));
    }
  }, [location.state]);

  if (!ViewG) {
    return <div>Carregando...</div>;
  }

  function createChapterList(numChapters: number): JSX.Element[] { //Função para criar uma lista de capítulos
    const chapterList: JSX.Element[] = [];
    if (numChapters == null) { 
      numChapters = 1000;
    }
    for (let i = 1; i <= numChapters; i++) {
      chapterList.push(<li key={i}>Capítulo {i}</li>);

    }

    // Retorna o array de elementos de capítulo
    return chapterList;
  }

  const {   //Desestruturando atributos de mangá e fornecendo valores padrão
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
      <Padrao/>
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
                : "Sem Classificação"}
            </li>
            <li>
              Classicação Etária:
              {ageRating &&
                `${Age_rating[ageRating] ||
                ageRating
                }`}{" "}
            </li>
          </ul>
          <img src={original} alt="capa do manga" />
                    {/* Fazer a verificação se estar logado na conta, caso não esteja não apresentar o botão de favoritos */}
                    <button className="favbutton" id={``} // Botão de Favoritos
            onClick={handleClick}> <img src={favorito ? starc : starv} alt="favorito"></img></button>
          <p>
            { // Use a synopsis se a description estiver vazia
              description ? `${description}` : `${synopsis}`
            }
          </p>
        </div>
        <div className="captitulo">
          <h1>Capítulos</h1>
        </div>
        <div className="cap">
          <ul>
            {chapterCount !== undefined && // Quantidade de capitulos
              createChapterList(chapterCount)}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default ViewG;