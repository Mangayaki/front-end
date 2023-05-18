import React, { useEffect, useState } from "react";
import Footer from "../../componentes/Footer";
import Padrao from "../../componentes/Padrao";
import "./ViewG.css";
import {Kapi, Age_rating, Manga} from "../../componentes/Section";
import { useLocation } from "react-router-dom";

function ViewG() {
  const [manga, setManga] = useState<Manga | null>(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mangaId = searchParams.get("mangaId");
  console.log(mangaId)

  useEffect(() => {
    if(mangaId){
    fetch(`${Kapi}?filter[id]=${mangaId}`)
      .then((response) => response.json())
      .then((response) => setManga(response.data[0]));
    }
    }, [mangaId]);

  function createChapterList(numChapters: number): JSX.Element[] {
    const chapterList: JSX.Element[] = [];
    for (let i = 1; i <= numChapters; i++) {
      chapterList.push(<li key={i}>Capítulo {i}</li>);
    }
    return chapterList;
  }

  if (!manga) {
    return <p>Carregando ...</p>;
  } 

  const {
    canonicalTitle = "",
    posterImage = { original: "" },
    description = "",
    startDate = "",
    status = "",
    ageRatingGuide = "",
    chapterCount,
  } = manga?.attributes || {};

  const posterImageUrl = posterImage?.original || "";

  return (
    <div>
      <Padrao />
      <div className="mangaview">
        <div className="descrition">
          <h1>{canonicalTitle}</h1>
          <ul>
            <li></li>
            <li>{startDate}</li>
            <li id="invisible"></li>
            <li>{ageRatingGuide}</li>
            <li>{status}</li>
          </ul>
          <img src={posterImageUrl} alt="capa do manga" />
          <p>{description}</p>
        </div>
        <div className="captitulo">
          <h1> Capítulos</h1>
        </div>
        <div className="cap">
          <ul>{chapterCount !== undefined && createChapterList(chapterCount)}</ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewG;
