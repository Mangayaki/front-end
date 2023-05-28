import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterPage from './RegisterPage';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


describe('registro', () =>{
    test('given user clicks on avanca button, then go to user home', async () => {
        render(
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RegisterPage />} />
                </Routes>
            </BrowserRouter>
        );
        const avancaButton = screen.getByTestId('avanca-button');
        await userEvent.click(avancaButton);
        
        expect(window.location.pathname).toEqual('/userhome');
    })
})