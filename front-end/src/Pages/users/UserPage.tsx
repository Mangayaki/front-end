import React, { useEffect, useRef, useState } from "react";
import { Kapi, Manga, MangaperPagina, Age_rating } from '../../componentes/Section';
import Footer from '../../componentes/Footer';
import './UserPage.css';
import Slide from '../../componentes/slide';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../componentes/imagens/polvinhobranco.png';
//icons do menu
import topicon from '../../componentes/imagens/topicon.png';
import homeicon from '../../componentes/imagens/homeicon.png';
import usericon from '../../componentes/imagens/usericon.png';
import perfilicon from '../../componentes/imagens/perfiicon.png';
import favicon from '../../componentes/imagens/favicon.png';
import conficon from '../../componentes/imagens/conficon.png';
import logouticon from '../../componentes/imagens/logouticon.png';

function UserPage() {
    const location = useLocation();
    const goToHomePage = () => {
        navigate('/userhome');
    };

    //const [isLoggedIn, setIsLoggedIn] = useState(true); // Variável de estado para verificar se o usuário está logado


    const isLoggedIn = location.state && location.state.isLoggedIn; // Verifica se o usuário está logado


    const navigate = useNavigate();
    const [mangaPopular, setMangaPopular] = useState<Manga[]>([]);
    const [, setmangaId] = useState<number>(0);
    const mangaIdRef = useRef<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const offsetManga = currentPage * MangaperPagina;
    const [minPage] = useState<number>(10);
    // to change burger classes
    const [burgerlogout_class, setBurgerClass] = useState("burger-barlogout unclicked");
    const [menulogout_class, setMenuClass] = useState("menulogout hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [userMenu_class, setUserMenuClass] = useState("usermenu hidden");
    const [menuUser_class, setMenuUserClass] = useState("menuuser-bar unclicked");

    const handleTitleClick = (id: number) => { // Função para salvar o ID do mangar ao Clicar
        setmangaId(id);
        mangaIdRef.current = id;
        const queryParams = new URLSearchParams();
        queryParams.set("mangaId", mangaIdRef.current.toString());
        navigate(`/viewp?${queryParams.toString()}`);
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


    // toggle burger menu change
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-barlogout clicked");
            setMenuClass("menulogout visible");
        }
        else {
            setBurgerClass("burger-barlogout unclicked");
            setMenuClass("menulogout hidden");
        }
        setIsMenuClicked(!isMenuClicked);
    };

    const updateUserMenu = () => {
        if (!isMenuClicked) {
            setUserMenuClass("usermenu visible");
            setMenuUserClass("menuuser-bar clicked");
        }
        else {
            setUserMenuClass("usermenu hidden");
            setMenuUserClass("menuuser-bar unclicked");
        }
        setIsMenuClicked(!isMenuClicked);
    };

    return (
        <div>
            <nav className="navUser">
                <div className="burger-menulogout" onClick={updateMenu}>
                    <div className={burgerlogout_class}></div>
                    <div className={burgerlogout_class}></div>
                    <div className={burgerlogout_class}></div>
                </div>
                <img src={logo} alt='logo' className='LogoUser' onClick={goToHomePage}></img>
                <div className="menuuser-usermenu" onClick={updateUserMenu}>
                    <div className={menuUser_class}>
                        <img src={usericon} alt='usericon'></img>
                    </div>
                    <div className={menuUser_class}>
                        <button type="button" className="buttonzinhologout">Logout</button>
                    </div>
                </div>
            </nav>
            <div>
                <Slide />
            </div>
            <div>
                <div className={menulogout_class}>
                    <ul className="nav-stylelogout">
                        <li><img src={homeicon} alt='home icon' className="homeiconlogout"></img><a href="/userhome">Inicío</a></li>
                        <li><img src={topicon} alt='top icon' className="topiconlogout"></img><a href="/top">Top</a></li>
                    </ul>
                </div>

                <div className={userMenu_class}>
                    <ul className="nav-styleusermenu">
                        <li><img src={perfilicon} alt='perfil icon' className="perfilicon"></img><a href="##">Perfil</a></li>
                        <li><img src={favicon} alt='favorito icon' className="favicon "></img><a href="##">Favoritos</a></li>
                        <li><img src={conficon} alt='configur icon' className="conficon"></img><a href="##">Configurações</a></li>
                        <li><img src={logouticon} alt='logout icon' className="logouticon"></img><a href="./login">Logout</a></li>
                    </ul>
                </div>
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
                <div>

                </div>
                <Footer />
            </div>
        </div>
    );
}

export default UserPage;
