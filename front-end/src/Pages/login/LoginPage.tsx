import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './../../componentes/imagens/mangayakiLogo.png';
import './LoginPage.css';
import { isEmailValid } from './../../componentes/helpers/EmailHelper';
import ValidationError from './../../componentes/ValidationError/ValidationError';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [form, setForm] = useState({
        email: {
            hasChanged: false,
            value: ""
        },
        password: {
            hasChanged: false,
            value: ""
        }
    });

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Variável para controlar o estado de login

    const navigate = useNavigate();

    const goToRegisterPage = () => {
        navigate('/register');
    };

    const goToUserHome = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/users/', {
                params: {
                    email: form.email.value,
                    password: form.password.value,
                    username: form.email.value.split('@')[0]
                }
            });
            if (response.status === 200) {
                const token = response.data.token;
                console.log('Login successful');
                setIsLoggedIn(true); // Altera o estado para true após o login ser realizado
                navigate('/userhome', { state: { isLoggedIn } }); // Passa o estado de login para a próxima página
            } else {
                console.log('Login inválido');
            }
        } catch (error) {
            console.error(error);
        }
        console.log('Mensagem enviada');
    };
    
    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <main>
            <img src={logo} alt='logo' className='Logoin' onClick={() => console.log(isLoggedIn)}></img>
            <section className='area-login'>
                <div className='login'>
                    <form>
                    <h2>Login</h2>
                            {/* Input para o email */}
                            <input type='email' placeholder='E-mail' value={form.email.value}
                                onChange={event => setForm({
                                    ...form, email: {
                                        hasChanged: true, value: event.target.value
                                    }
                                })}
                                data-testid='email' />
                            {/* Componente de validação para o email (obrigatório) */}
                            <ValidationError
                                hasChanged={form.email.hasChanged}
                                erroMessage='Email é obrigatório'
                                testId='email-required' type='required'
                                value={form.email.value} />

                            {/* Componente de validação para o email (inválido) */}
                            <ValidationError
                                hasChanged={form.email.hasChanged}
                                erroMessage='Email é inválido'
                                testId='email-invalid' type='email'
                                value={form.email.value} />

                            <h2>Senha</h2>
                            {/* Input para a senha */}
                            <input type='password' placeholder='Senha' value={form.password.value}
                                onChange={event => setForm({
                                    ...form, password: {
                                        hasChanged: true, value: event.target.value
                                    }
                                })}
                                data-testid="password" /><br></br>

                            {/* Componente de validação para a senha (obrigatória) */}
                            <ValidationError
                                hasChanged={form.password.hasChanged}
                                erroMessage='Senha é obrigatória'
                                testId='password-required' type='required'
                                value={form.password.value} />


                            {/* Botão para recuperar senha */}
                            <button className="recuperar" data-testid="recover-password-button"
                                disabled={!isEmailValid(form.email.value)}>
                                Esqueceu sua senha?</button>

                            <div className="ou" />
                            <div className="outxt"><p>OU</p></div>
                            <div className="twoou" />

                            {/* Botão de login */}
                            <button type='button'
                                data-testid="login-button"
                                disabled={!isEmailValid(form.email.value) || !form.password.value} 
                                onClick={goToUserHome}
                                > 
                                Entrar
                                </button>
                            <button type='button' data-testid="register-button"
                                onClick={goToRegisterPage}> Criar nova conta</button>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;
