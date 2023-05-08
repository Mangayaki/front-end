import React, { useEffect, useState } from "react";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import './Topison.css';

interface Manga {
  id: number;
  attributes: {
    canonicalTitle: string;
    posterImage: {
      original: string;
    };
    ageRating?: string;
    synopsis: string;
  };
}

export const Age_rating: Record<string, string> = {
  G: "Livre",
  PG: "10 anos",
  R: "14 anos",
  R18: "18 anos",
};

const Kapi = `https://kitsu.io/api/edge`;

function Top() {
  const [mangaTrends, setMangaTrends] = useState<Manga[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${Kapi}/trending/manga`)
      .then((response) => response.json())
      .then((response) => setMangaTrends(response.data));
  }, []);

  const toggleExpansion = (id: number) => {
    if (id === expandedId){
      setExpandedId(null);
    } else{
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
                  <h2>{attributes.canonicalTitle}</h2>
                  <p>
                  {id === expandedId ? attributes.synopsis : `${attributes.synopsis.slice(0, 300)}...`}
                      <span onClick={() => toggleExpansion(id)}>
                        {id === expandedId ? " Ler menos" : " Ler mais"}
                      </span>
                  </p>
                  {attributes.ageRating && (
                    <h6>{`Classificação etária: ${
                      Age_rating[attributes.ageRating] || attributes.ageRating
                    }`}</h6>
                  )}
                </div>
              </li>
            ))
          ) : (
            <p>Carregando Mangá...</p>
          )}
        </ul>
      </div>

      <Footer />
    </div>
  );
}

export default Top;
