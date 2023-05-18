import React, { useEffect, useRef, useState } from "react";
import Footer from "../../componentes/Footer";
import Padrao from "../../componentes/Padrao";
import "./ViewG.css";
import { Kapi, Age_rating, Manga} from "../../componentes/Section";


function ViewG() {
  const [manga, setManga] = useState<Manga | null>(null);
  const mangaIdRef = useRef<number>();
  console.log(mangaIdRef.current);
  useEffect(() => {
    fetch(`${Kapi}?filter[id]=${mangaIdRef.current}`)
      .then((response) => response.json())
      .then((response) => setManga(response.data[0]));
  }, []);

  function createChapterList(numChapters: number): JSX.Element[] {
    const chapterList: JSX.Element[] = [];
    for (let i = 1; i <= numChapters; i++) {
      chapterList.push(<li key={i}>Capítulo {i}</li>);
    }
    return chapterList;
  }

  const {
    canonicalTitle = "",
    posterImage = { original: "" },
    description = "",
  } = manga?.attributes || {};

  const posterImageUrl = posterImage?.original || "";

  return (
    <div>
      <Padrao />
      <div className="mangaview">
        <div className="descrition">
          <h1>{}</h1>
          <ul>
            <li></li>
            <li></li>
            <li id="invisible"></li>
            <li></li>
            <li></li>
          </ul>
          <img src={posterImageUrl} alt="capa do manga" />
          <p></p>
        </div>
        <div className="captitulo">
          <h1> Capítulos</h1>
        </div>
        <div className="cap">
          <ul>{createChapterList(10)}</ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewG;
