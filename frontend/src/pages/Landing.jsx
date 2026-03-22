import React from 'react'
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Landing = () => {
  return (
    <>
        <Navbar/>
        <HeroSection />
        <FeaturesSection />
        <Footer />

    </>
  )
}

export default Landing