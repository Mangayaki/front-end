import React, { ChangeEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './imagens/polvinhobranco.png';
import topicon from './imagens/topicon.png';
import homeicon from './imagens/homeicon.png';
import usericon from './imagens/usericon.png';
import Slide from './slide';
import './Header.css';
import { Kapi, Manga } from "../componentes/Section";

const Header = () => {
    const navigate = useNavigate();
    const goToLoginPage = () => {
        navigate('/login');
    }
    const goToHomePage = () => {
        navigate('/');
    }
    // mudança da classe burger 
    const [burger_class, setBurgerClass] = useState("burger-bar unclicked")
    const [menu_class, setMenuClass] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)
    const [searchManga, setSearchManga] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    // alternar mudança de menu de burguer
    const updateMenu = () => {
        if (!isMenuClicked) {
            setBurgerClass("burger-bar clicked")
            setMenuClass("menu visible")
        }
        else {
            setBurgerClass("burger-bar unclicked")
            setMenuClass("menu hidden")
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
            <nav className="navheader">
                <div className="burger-menu" onClick={updateMenu}>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                    <div className={burger_class} ></div>
                </div>
                <img src={logo} alt='logo' className='Logo' onClick={goToHomePage}></img>
                <div>
                    <form onSubmit={handleSearch}>
                        <input type="text" value={searchManga} onChange={handleSearchInputChange} placeholder="Buscar manga..." />
                        <button type="submit">Pesquisar</button>
                    </form>
                    <div>
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
                <div className="user">
                    <img src={usericon} alt='usericon'></img>
                    <button type="button" onClick={goToLoginPage} className="buttonzinho">Fazer Login</button>
                </div>
            </nav>
            <div>
                <Slide />
            </div>
            <div className={menu_class}>
                <ul className="nav-style">
                    <li><img src={homeicon} alt='homeicon' className="homeicon"></img><a href="/">Inicío</a></li>
                    <li><img src={topicon} alt='topicon' className="topicon"></img><a href="/top">Top</a></li>
                </ul>
            </div>
        </div>
    )
}
export default Header;

