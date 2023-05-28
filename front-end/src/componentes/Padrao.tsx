import React, { ChangeEvent, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "./imagens/polvinhobranco.png";
import topicon from './imagens/topicon.png';
import homeicon from './imagens/homeicon.png';
import usericon from './imagens/usericon.png';
import lupa from './imagens/lupa.png';
import "./Padrao.css";
import "./Header.css";
import { Kapi, Manga } from "../componentes/Section";

const Padrao = () => {
    const navigate = useNavigate();
    const goToLoginPage = () => {
        navigate('/login');
    }
    const goToHomePage = () => {
        navigate('/');
    }
    // to change burger classes
    const [burgerpadrao_class, setBurgerPadraoClass] = useState("burgerpadrao-bar unclickedpadrao")
    const [menupadrao_class, setMenuPadraoClass] = useState("menupadrao hiddenpadrao")
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    const [searchManga, setSearchManga] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    // toggle burger menu change
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerPadraoClass("burgerpadrao-bar clickedpadrao")
            setMenuPadraoClass("menupadrao visiblepadrao")
        }
        else {
            setBurgerPadraoClass("burgerpadrao-bar unclickedpadrao")
            setMenuPadraoClass("menupadrao hiddenpadrao")
        }
        setIsMenuClicked(!isMenuClicked)
    }
        //Função de busca de manga pelo nome
        const handleSearchInputChange = (event: ChangeEvent<HTMLInputElement>) => {
            setSearchManga(event.target.value);
        };
        const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            axios.get(`${Kapi}/manga?filter[text]=${encodeURIComponent(searchManga)}`)
                .then(response => { // Processar a resposta da API e fazer algo com os resultados
                    setSearchResults(response.data.data);
                    console.log(response.data);
                })
                .catch(error => {   // Lidar com erros da requisição
                    console.error(error);
                });
        };
        const handleMangaClick = (mangaId: string) => { //Ir para página do manga
            navigate('/viewg', { state: { mangaId } });
        }

    return (
        <div>
            <nav className="padraozao">
                <div className="burgerpadrao-menu" onClick={updateMenu}>
                    <div className={burgerpadrao_class} ></div>
                    <div className={burgerpadrao_class} ></div>
                    <div className={burgerpadrao_class} ></div>
                </div>
                <img src={logo} alt='logo' className='Logopadrao' onClick={goToHomePage}></img>

                <div className="searchbar">
                    <form onSubmit={handleSearch}>
                        <input type="text" value={searchManga} onChange={handleSearchInputChange} placeholder="Buscar manga..."></input>
                        <button type="submit"><img src={lupa} alt='lupa'></img></button>
                    </form>
                    <div className="searchbarresults">
                        {searchResults.length > 0 &&
                            <ul>
                                {searchResults.map(Manga => (
                                    <li key={Manga.id}>
                                        <a href='###' onClick={() => handleMangaClick(Manga.id)}>{Manga.attributes.canonicalTitle}</a>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>

                <div className="userpadrao">
                    <img src={usericon} alt='usericon'></img>
                    <button type="button" onClick={goToLoginPage} className="buttonzinhopadrao">Fazer Login</button>
                </div>
            </nav>

            <div className={menupadrao_class}>
                <ul className="nav-stylepadrao">
                    <li><img src={homeicon} alt='homeicon' className="homeiconpadrao"></img><a href="/">Inicío</a></li>
                    <li><img src={topicon} alt='topicon' className="topiconpadrao"></img><a href="/top">Top</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Padrao;

