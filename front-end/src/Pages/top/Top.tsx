//import React, { useState } from "react";
import React, { useEffect, useState } from "react";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
//import Padrao from "../../componentes/Padrao";
import './Topison.css';
import Section from "../../componentes/Section";

export const Age_rating = {
  G: "Livre",
  PG: "10 anos",
  R: "14 anos",
  R18: "18 anos",
};
export const Kapi = `https://kitsu.io/api/edge`;
function Top() {
  const [mangaTrends, setMangaTrends] = useState([]);

  useEffect(() => {
    fetch(`${Kapi}/trending/manga`)
      .then((response) => response.json())
      .then((response) => setMangaTrends(response.data));
  },[]);
  return (
    <div>
      <Header />

      <div className="trend">
        <h2>Top Trend Manga</h2>
        <ul>
          {mangaTrends
            ? mangaTrends.map(
              ({
                id,
                attributes: {
                  canonicalTitle,
                  posterImage: { original },
                  ageRating, synopsis,
                },
              }) => (
                <li key={id}>
                  <img
                    src={original}
                    alt={`Poster do Mangá com ID ${id}`}
                    
                  />
                  <div>
                    <h2 >{canonicalTitle}</h2>
                    <p> {synopsis} </p>
                    {ageRating && (
                      <h6>{`Classificação etária: ${
                        Age_rating[ageRating] || ageRating
                      }`}</h6>
                    )}
                  </div>
                </li>
              )
            )
          : "Carregando Mangá..."}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Top;
