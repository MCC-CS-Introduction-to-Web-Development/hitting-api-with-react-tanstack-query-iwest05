"use client";
import React from 'react';
import HeroSection from "./HeroSection";
import Header from "./Header";
import HelloWorld from "./HelloWorld";

function App() {
    return (
        <>
            <Header />
            <HeroSection />
            <HelloWorld name="Iain West" />
        </>
    );
}

export default App;