import React, { useEffect, useRef, useState } from "react";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import { useNavigate} from "react-router-dom";
import './Topison.css';
import { Kapi, Age_rating, Manga } from "../../componentes/Section";

function Top() {
  const navigate = useNavigate();
  const [mangaTrends, setMangaTrends] = useState<Manga[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [, setmangaId] = useState<number | null>(null);
  const mangaIdRef = useRef<number>(0);

  const handleTitleClick = (id: number) => {
    setmangaId(id);
    mangaIdRef.current = id;
    const queryParams = new URLSearchParams();
    queryParams.set("mangaId", mangaIdRef.current.toString());
    navigate(`/viewg?${queryParams.toString()}`);
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
                  <button
                    id={`${id}`}
                    onClick={() => {
                      handleTitleClick(id);
                      navigate('/viewg', { state: { mangaId: id } });
                    }}
                  >
                    {attributes.canonicalTitle}
                  </button>
                  <p className={id === expandedId ? 'expandable' : 'collapsed'}>
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
