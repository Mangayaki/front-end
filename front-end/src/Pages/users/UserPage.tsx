import React, { useState } from "react";
import Section from '../../componentes/Section';
import Footer from '../../componentes/Footer';
import './UserPage.css';
import Slide from '../../componentes/slide';
import { useNavigate } from 'react-router-dom';
import logo from '../../componentes/imagens/polvinhobranco.png';
//icons do menu
import topicon from '../../componentes/imagens/topicon.png';
import homeicon from '../../componentes/imagens/homeicon.png';
import usericon from '../../componentes/imagens/usericon.png';
import perfilicon from '../../componentes/imagens/perfiicon.png';
import favicon from '../../componentes/imagens/favicon.png';
import conficon from '../../componentes/imagens/conficon.png';
import logouticon from '../../componentes/imagens/logouticon.png';




//imagens sessão de sugestao e favoritos
import manga1 from '../../componentes/imagens/capa/manga1.jpg';
import manga2 from '../../componentes/imagens/capa/manga2.jpg';
import manga3 from '../../componentes/imagens/capa/manga3.jpg';
import manga4 from '../../componentes/imagens/capa/manga4.jpg';
import manga5 from '../../componentes/imagens/capa/manga5.png';
import manga6 from '../../componentes/imagens/capa/manga6.jpg';
import manga7 from '../../componentes/imagens/capa/manga7.jpg';
import manga8 from '../../componentes/imagens/capa/manga8.jpg';
import manga9 from '../../componentes/imagens/capa/manga9.jpg';
import manga10 from '../../componentes/imagens/capa/manga10.jpg';


function UserPage() {
    const navigate = useNavigate();
    const goToHomePage = () => {
        navigate('/userhome');
    };
    // to change burger classes
    const [burgerlogout_class, setBurgerClass] = useState("burger-barlogout unclicked");
    const [menulogout_class, setMenuClass] = useState("menulogout hidden");
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const [userMenu_class, setUserMenuClass] = useState("usermenu hidden");
    const [menuUser_class, setMenuUserClass] = useState("menuuser-bar unclicked");

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
                        <h2>Nome do Usuário</h2>                
                    </div>
                    <div className={menuUser_class}>
                        <button type="button" className="buttonzinhologout">Logout</button>
                    </div>
                </div>
            </nav>
            <div>
                <Slide />
            </div>
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
            <div className="homeU">
                <div className='fav'>
                    <h2>Favoritos</h2>
                    <ul>
                        <li><img src={manga1} alt='capa do manga'></img></li>
                        <li><img src={manga2} alt='capa do manga'></img></li>
                        <li><img src={manga3} alt='capa do manga'></img></li>
                        <li><img src={manga4} alt='capa do manga'></img></li>
                        <li><img src={manga5} alt='capa do manga'></img></li>
                    </ul>
                </div>
                <div className='sugest'>
                    <h2>Sugestões Para Você</h2>
                    <ul>
                        <li><img src={manga1} alt='capa do manga'></img></li>
                        <li><img src={manga2} alt='capa do manga'></img></li>
                        <li><img src={manga3} alt='capa do manga'></img></li>
                        <li><img src={manga4} alt='capa do manga'></img></li>
                        <li><img src={manga5} alt='capa do manga'></img></li>
                    </ul>
                    <ul>
                        <li><img src={manga6} alt='capa do manga'></img></li>
                        <li><img src={manga7} alt='capa do manga'></img></li>
                        <li><img src={manga8} alt='capa do manga'></img></li>
                        <li><img src={manga9} alt='capa do manga'></img></li>
                        <li><img src={manga10} alt='capa do manga'></img></li>
                    </ul>
                </div>
            </div>
            <Section />
            <Footer />
        </div >
    );
}

export default UserPage;