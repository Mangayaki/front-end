import React, { useEffect, useState } from "react";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import './Topison.css';
import {Kapi, Age_rating, Manga} from "../../componentes/Section";

function Top() {
  const [mangaTrends, setMangaTrends] = useState<Manga[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [mangaId, setmangaId] = useState<number | null>(null);


  const handleTitleClick = (id: number) => {
    setmangaId(id);
    console.log(mangaId);
  }

  useEffect(() => {
    fetch(`${Kapi}/trending/manga`)
      .then((response) => response.json())
      .then((response) => setMangaTrends(response.data));
  }, []);

  const toggleExpansion = (id: number) => {
    if (id === expandedId) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  }

  return (
    <div>
      <Header />

      <div className="trend">
        <h2>Top Trend Manga</h2>
        <ul>
          {mangaTrends.length > 0 ? (
            mangaTrends.map(({ id, attributes }) => (
              <li key={id}>
                <img src={attributes.posterImage.original} alt={`Poster do Mangá com ID ${id}`} />
                <div className="descriptionTop">
                  <button id={id.toString()} onClick={() => handleTitleClick(id)}>
                    {attributes.canonicalTitle}</button>
                  <p>
                    {id === expandedId ? attributes.synopsis : `${attributes.synopsis.slice(0, 300)}...`}
                    <span onClick={() => toggleExpansion(id)}>
                      {id === expandedId ? " Ler menos" : " Ler mais"}
                    </span>
                  </p>
                  {attributes.ageRating && (
                    <h6>{`Classificação etária: ${Age_rating[attributes.ageRating] || attributes.ageRating
                      }`}</h6>
                  )}
                </div>
              </li>
            ))
          ) : (
            <div>Carregando...</div>
          )}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Top;
