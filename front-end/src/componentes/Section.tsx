import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Section.css";
//import {useHistory} from "react-router-history";

const Age_rating = {
  G: "Livre",
  PG: "10 anos",
  R: "14 anos",
  R18: "18 anos",
};

function Section() {
  const id = 0;
  const [mangaPopular, setMangaPopular] = useState([]);
  const [mangarIDclick, setmangarIDClick] = useState(id);
  const Kapi = `https://kitsu.io/api/edge`;

  const navigate = useNavigate( );
  useEffect(() => {
    fetch(`${Kapi}/trending/manga`)
      .then((response) => response.json())
      .then((response) => setMangaPopular(response.data));
  }, []);

  const handlePosterClick = ([]) => {
    setmangarIDClick(id);
    navigate(``)
    console.log(`ID do mangá: ${id}`);
  };

  return (
    <div className="homeC">
      <div className="popular">
        <h2>Mangás</h2>
        <ul>
          {mangaPopular
            ? mangaPopular.map(
                ({
                  id,
                  attributes: {
                    canonicalTitle,
                    posterImage: { original },
                    ageRating, synopsis
                  },
                }) => (
                  <li key={id}>
                    <img
                      src={original}
                      alt={`Poster do Mangá com ID ${id}`}
                      
                    />
                    <div>
                      <h2 onClick={() => handlePosterClick(id)}>{canonicalTitle}</h2>
                      <p> {synopsis} </p>
                      {ageRating && (
                        <h4>{`Classificação etária: ${
                          Age_rating[ageRating] || ageRating
                        }`}</h4>
                      )}
                    </div>
                  </li>
                )
              )
            : "Carregando Mangá..."}
        </ul>
      </div>
    </div>
  );
}
export default Section;
