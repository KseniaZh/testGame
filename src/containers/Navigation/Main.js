import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../Home/Home';


export const Main = () => {

    return (
        <main className='main_wrapper'>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </main>
    )
}
