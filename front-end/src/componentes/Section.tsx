import React, { useEffect, useState } from "react";
//import { Age_rating, Kapi } from '../../Pages/top/Top';
import { useNavigate } from "react-router-dom";
import "./Section.css";

const Age_rating = {
  G: "Livre",
  PG: "10 anos",
  R: "14 anos",
  R18: "18 anos",
};

function Section() {
  const [mangaPopular, setMangaPopular] = useState([]);
  //const [mangaID, setMangaID] = useMangaID(0);
  const Kapi = `https://kitsu.io/api/edge`;

  const navigate = useNavigate( );
  useEffect(() => {
    fetch(`${Kapi}/manga?page[limit]=20&page[offset]=20`)
      .then((response) => response.json())
      .then((response) => setMangaPopular(response.data));
  }, []);

  return (
    <div className="homeC">
      <div className="popular">
        <h2>Mangás</h2>
        <ul>
          {mangaPopular
            ? mangaPopular
                .map(
                  ({
                    id,
                    attributes: {
                      canonicalTitle,
                      posterImage: { original },
                      ageRating,
                    },
                  }) => (
                    <li key={id}>
                      <img
                        src={original}
                        alt={`Poster do Mangá com ID ${id}`}
                      />
                      <div className="descriptionSection">
                        <h2>{canonicalTitle}</h2>
                        {ageRating ? (
                          <h6>{`Classificação etária: ${
                            Age_rating[ageRating] || ageRating
                          }`}</h6>
                        ) :(
                          <h6>Sem Classificação</h6>
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
