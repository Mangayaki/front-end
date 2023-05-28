import React, { useState, ChangeEvent } from 'react';
import logo from './../../componentes/imagens/mangayakiLogo.png';
import ValidationError from './../../componentes/ValidationError/ValidationError';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import axios from 'axios';

const RegisterPage = () => {
    const navigate = useNavigate();
<<<<<<< HEAD
    const [form, setForm] = useState({
        email: { value: '', hasChanged: false },
        password: { value: '', hasChanged: false }
    });

    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: { value, hasChanged: true }
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/', {
                username: form.email.value,
                email: form.email.value,
                password: form.password.value

            });
            if (response.status === 200) {
                const token = response.data.token;
                console.log('Login successful');
                navigate('/userhome');
            } else {
                console.log('Login inválido');
            }
        } catch (error) {
            console.error(error);
        }
        console.log('Mensagem enviada');
    };


=======
    const goToUserHome = () => {
        navigate('/userhome');
    }
>>>>>>> b0c5742170526ba3c10d4a28038f112838e1a13f
    const goToHomePage = () => {
        navigate('/');
    };

    return (
        <div>
            <img src={logo} alt='logo' className='Logoin' onClick={goToHomePage}></img>
            <section className='area-register'>
                <div className='register'>
                    <form onSubmit={handleSubmit}>
                        <h2>Nome de Usuário</h2>
                        <input type='text' placeholder='Nome de Usuário'></input>
                        <h2>E-mail</h2>
                        <input
                            type='email'
                            name='email'
                            placeholder='E-mail'
                            value={form.email.value}
                            onChange={handleFormChange}
                            data-testid='email'
                        />
                        <ValidationError
                            hasChanged={form.email.hasChanged}
                            erroMessage='Email é obrigatório'
                            testId='email-required'
                            type='required'
                            value={form.email.value}
                        />
                        <ValidationError
                            hasChanged={form.email.hasChanged}
                            erroMessage='Email é inválido'
                            testId='email-invalid'
                            type='email'
                            value={form.email.value}
                        />
                        <h2>Senha</h2>
                        <input
                            type='password'
                            name='password'
                            placeholder='Senha'
                            value={form.password.value}
                            onChange={handleFormChange}
                            data-testid='password'
                        />
                        <ValidationError
                            hasChanged={form.password.hasChanged}
                            erroMessage='Senha é obrigatória'
                            testId='password-required'
                            type='required'
                            value={form.password.value}
                        />
                        <div className='ouregister' />
                        <div className='twoouregister' />
                        <button type='button' data-testid='avanca-button' onClick={handleSubmit}>
                            Avançar
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

<<<<<<< HEAD
export default RegisterPage;
=======
                                <ValidationError
                                    hasChanged={form.email.hasChanged}
                                    erroMessage='Email é inválido'
                                    testId='email-invalid' type='email'
                                    value={form.email.value} />

                                <h2>Senha</h2>
                                <input type='password' placeholder='Senha' value={form.password.value}
                                    onChange={event => setForm({
                                        ...form, password: {
                                            hasChanged: true, value: event.target.value
                                        }
                                    })}
                                    data-testid="password" /><br></br>

                                <ValidationError
                                    hasChanged={form.password.hasChanged}
                                    erroMessage='Senha é obrigatória'
                                    testId='password-required' type='required'
                                    value={form.password.value} />
                            <div className="ouregister" />
                            <div className="twoouregister" />
                            <button type='button' data-testid="avanca-button" onClick={goToUserHome}> Avançar </button>
                        </form>
                    </div>
                </section>
            </body>
        </main>
    )
}

export default RegisterPage
>>>>>>> b0c5742170526ba3c10d4a28038f112838e1a13f
