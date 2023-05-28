import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Padrao from "../../componentes/Padrao";
import starv from '../../componentes/imagens/star1.png';
import starc from '../../componentes/imagens/star.png';
import "./ViewG.css";
import { Age_rating, Kapi } from "../../componentes/Section";
import axios from 'axios'

const ViewG = () => {
  const location = useLocation();
  const [ViewG, SetViewG] = useState(null);
  const [favorito, setFavorito] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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


      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, [location.state]);


  const adicionarAosFavoritos = () => { //Extrir o ID e o Titulo do manga de ViewG
    if (ViewG) {
      const { id, canonicalTitle } = ViewG;

      const dados = {
        id: id,
        canonicalTitle: canonicalTitle,
      };

      axios
        .post("http://127.0.0.1:8000/api/user-favs/", dados)
        .then((response: any) => { //Manipular a resposta da API, se necessário
          console.log("Mangá adicionado aos favoritos", response.data)
        })
        .catch((error: any) => { //Lidar com erros, se houver algum
          console.error("Error ao adicionar aos favoritos", error);
        })
    }
  };

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
          {isLoggedIn && (
  <button
    className="favbutton"
    id={``}
    onClick={() => {
      handleClick();
      adicionarAosFavoritos();
    }}
  >
    <img src={favorito ? starc : starv} alt="favorito" />
  </button>
)} 
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
    </div >
  );
}


export default ViewG;