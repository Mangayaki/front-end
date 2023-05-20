import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../componentes/Footer";
import Padrao from "../../componentes/Padrao";
import "./ViewG.css";
import { Age_rating, Kapi, Manga } from "../../componentes/Section";

function ViewG() {
  const [manga_name, setManga_name] = useState<Manga | null>(null);
  /*const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mangaId = searchParams.get("mangaId");*/
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mangaId = searchParams.get("mangaId");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mangaId) {
        setLoading(true); // Inicia o carregamento dos dados
        fetch(`${Kapi}/manga/${mangaId}`)
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            setManga_name(response.data);
            setLoading(false); // Finaliza o carregamento dos dados
          })
          .catch((error) => {
            console.error(error);
            setLoading(false); // Finaliza o carregamento dos dados mesmo em caso de erro
          });
      }
    }, 5000); // Aguarda 1 segundo antes de carregar os dados

    return () => clearTimeout(timer); // Limpa o timeout ao desmontar o componente
  }, [mangaId]);

    // Verifica se os dados estão sendo carregados
    /*if (mangaId == null) {
      return <div>Carregando...</div>;
    }*/
  //Função para criar uma lista de capítulos
  function createChapterList(numChapters: number): JSX.Element[] {
    const chapterList: JSX.Element[] = [];
    for (let i = 1; i <= numChapters; i++) {
      chapterList.push(<li key={i}>Capítulo {i}</li>);
    }
    return chapterList;
  }

  //Desestruturando atributos de mangá e fornecendo valores padrão
  const { chapterCount } = manga_name?.attributes || {};
  const {
    canonicalTitle = "",
    posterImage = { original: "" },
    synopsis = "",
    description = "",
    startDate = "",
    status = "",
    ageRatingGuide = "",
  } = manga_name?.attributes || {};
  const posterImageUrl = posterImage.original || "";

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
              {manga_name?.attributes.ageRating &&
                `${
                  Age_rating[manga_name.attributes.ageRating] ||
                  manga_name.attributes.ageRating
                }`}{" "}
            </li>
            {/* Adicione outros dados relevantes do mangá */}
          </ul>
          <img src={posterImageUrl} alt="capa do manga" />
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