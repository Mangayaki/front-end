import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Section.css";

export const Age_rating: Record<string, string> = { // Transforma a Classificação de Faixa etária EN para PT
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

export const MangaperPagina = 20;

function Section() {
  const navigate = useNavigate();
  const [mangaPopular, setMangaPopular] = useState<Manga[]>([]);
  const [, setmangaId] = useState<number>(0);
  const mangaIdRef = useRef<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const offsetManga = currentPage * MangaperPagina;
  const [minPage] = useState<number>(10);

  const handleTitleClick = (id: number) => { // Função para salvar o ID do mangar ao Clicar
    setmangaId(id);
    mangaIdRef.current = id;
    const queryParams = new URLSearchParams();
    queryParams.set("mangaId", mangaIdRef.current.toString());
    navigate(`/viewg?${queryParams.toString()}`);
  }

  useEffect(() => {
    fetch(`${Kapi}/manga?page[limit]=${MangaperPagina}&page[offset]=${offsetManga}`)
      .then((response) => response.json())
      .then((response) => setMangaPopular(response.data))
      .catch((error) => console.error(error));
  }, [currentPage, offsetManga]);

  const handlePageChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };
  const renderPaginationButtons = () => {
    const buttons = [];
    const totalPages = Math.ceil(mangaPopular.length / MangaperPagina);
    const pageCount = Math.max(totalPages, minPage);

    buttons.push( // Botão Anterior
      <button
        key="previous"
        className={currentPage === 0 ? "disabled" : ""}
        onClick={() => handlePageChange({ selected: currentPage - 1 })}
      >
        Anterior
      </button>
    );

    for (let i = 0; i < pageCount; i++) { // Botões de 1 a 10
      buttons.push(
        <button
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => handlePageChange({ selected: i })}
        >
          {i + 1}
        </button>
      );
    }

    buttons.push( // Botão Próximo
      <button
        key="next"
        className={currentPage === pageCount - 1 ? "disabled" : ""}
        onClick={() => handlePageChange({ selected: currentPage + 1 })}
      >
        Próximo
      </button>
    );

    return buttons;
  };

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
                        <h6>{`Classificação etária: ${Age_rating[ageRating] || ageRating //Caso não haja classificação apresentar a mensagem Sem Classificação
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
        <div className="pagination">
          {renderPaginationButtons()}

        </div>
      </div>
    </div>
  );
}
export default Section;