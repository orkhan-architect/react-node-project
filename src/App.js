import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import CinemaDetails from './Components/CinemaDetails/CinemaDetails';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <Navbar />
                <Routes>
                    <Route exact path='/' element={<Navigate replace to="/cinemas" />} />
                    <Route exact path="/cinemas" element={<Home />} />
                    <Route exact path="/cinemas/search" element={<Home />} />
                    <Route exact path="/cinemas/:id" element={<CinemaDetails />} />
                    <Route exact path='/auth' element={(!user ? <Auth /> : <Navigate replace to="/cinemas" />)} />
                </Routes>                
            </Container>
        </BrowserRouter>
    );
}

export default App;