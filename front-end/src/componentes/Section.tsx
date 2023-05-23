import React, { useEffect, useRef, useState} from "react";
import { useNavigate} from "react-router-dom";
import "./Section.css";


export const Age_rating: Record<string, string> =  { // Transforma a Classificação de Faixa etária EN para PT
  G: "Livre",
  PG: "10 anos",
  R: "14 anos",
  R18: "18 anos",
};

export const Kapi = `https://kitsu.io/api/edge`; //Link padrão da API Kitsu


export interface Manga { //
  id: number;
  attributes: {
    canonicalTitle: string;
    posterImage: {
      original: string;
    };
    ageRating?: string;
    synopsis: string;
    description: string;
    startDate: string;
    status: string;
    ageRatingGuide: string;
    chapterCount: number;
  };
}

function Section() {
  
  const navigate = useNavigate();
  const [mangaPopular, setMangaPopular] = useState<Manga[]>([]);
  const [, setmangaId] = useState<number>(0);
  const mangaIdRef = useRef<number>(0);

  const handleTitleClick = (id: number) => { // Função para salvar o ID do mangar ao Clicar
    setmangaId(id);
    mangaIdRef.current = id;
    const queryParams = new URLSearchParams();
    queryParams.set("mangaId", mangaIdRef.current.toString());
    navigate(`/viewg?${queryParams.toString()}`);
  }

  useEffect(() => {
    fetch(`${Kapi}/manga?page[limit]=20&page[offset]=22`)
      .then((response) => response.json())
      .then((response) => setMangaPopular(response.data))
      .catch((error) => console.error(error));
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
                      {id != null ? (
                        <button
                        id={`${id}`}
                          onClick={() => {
                            handleTitleClick(id);
                            navigate('/viewg', { state: { mangaId: id } });
                            }}
                        >
                          {canonicalTitle}
                        </button>
                      ) : null}
                      {ageRating ? (
                        <h6>{`Classificação etária: ${Age_rating[ageRating] || ageRating
                          }`}</h6>
                      ) : (
                        <h6>Sem Classificação</h6>
                      )}
                    </div>
                  </li>
                )
              )
            : (<div>Carregando..</div>)}
        </ul>
      </div>
    </div>
  );
}
export default Section;