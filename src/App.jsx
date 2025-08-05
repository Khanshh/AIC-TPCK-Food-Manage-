import { useEffect, useState } from 'react';
import './styles/main.css';
import Header from './components/header.jsx';
import Hero from './components/hero.jsx';
import Features from './components/features.jsx';
import Stats from './components/stats.jsx';
import Footer from './components/footer.jsx';
import About from './components/about.jsx';

export default function App() {
  useEffect(() => {
    const header = document.querySelector('.header');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const hamburger = document.querySelector('.hamburger');

    function toggleSidebar() {
      sidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    }

    function handleScroll() {
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
      } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
      }
    }

    function handleAnchorClick(e) {
      e.preventDefault();
      const target = document.querySelector(e.currentTarget.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (sidebar.classList.contains('active')) toggleSidebar();
    }

    function handleOutsideClick(e) {
      if (!sidebar.contains(e.target) && !hamburger.contains(e.target) && sidebar.classList.contains('active')) {
        toggleSidebar();
      }
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <Header />
      <div class="cute-decoration">🌿</div>
      <div class="cute-decoration">🥗</div>
      <div class="cute-decoration">🍎</div>
      <div class="cute-decoration">🥕</div>
      <Hero />
      <About />
      <Features />
      <Stats />
      <Footer />
    </>
  );
}
