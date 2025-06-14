import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Slider from '../components/Slider'; // 👈 Importing your slider component

const HomePage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const secondSectionRef = useRef(null);

  const navItems = [
    { label: 'Home', path: '/', scrollTo: null },
    { label: 'Play', path: '/map', scrollTo: null },
    { label: 'Guide', path: null, scrollTo: null },
    { label: 'About', path: null, scrollTo: null },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = () => {
    if (secondSectionRef.current) {
      secondSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (item) => {
    setMenuOpen(false);
    if (item.scrollTo === 'secondSection') {
      scrollToSection();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <div style={styles.wrapper}>
      <header style={isMobile ? styles.headerMobile : styles.header}>
        <div style={styles.logo}>Lurmap</div>
        {isMobile ? (
          <>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={styles.faHamburger}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
            {menuOpen && (
              <nav style={styles.mobileNav}>
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    style={styles.navButton}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            )}
          </>
        ) : (
          <nav style={styles.desktopNav}>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                style={styles.navButton}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Welcome to Lurmap</h1>
        <p style={styles.subtitle}>Bringing map games into the modern era.</p>
        <button onClick={scrollToSection} style={styles.ctaButton}>
          Start Playing
        </button>
      </main>

      <section ref={secondSectionRef}>
        <Slider />
        <style>
          {`
            [data-card]:hover {
              transform: scale(1.05);
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            }
          `}
        </style>
      </section>

      <footer style={styles.footer}>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} Lurmap. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  wrapper: {
    fontFamily: 'system-ui, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    color: '#1a202c',
  },
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    borderBottom: '1px solid #e2e8f0',
    zIndex: 1000,
  },
  headerMobile: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    borderBottom: '1px solid #e2e8f0',
    zIndex: 1000,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
  },
  desktopNav: {
    display: 'flex',
    gap: '1.5rem',
  },
  mobileNav: {
    position: 'absolute',
    top: '100%',
    right: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '0.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    zIndex: 1000,
  },
  navButton: {
    background: 'none',
    border: 'none',
    fontSize: '1rem',
    color: '#1a202c',
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
  },
  faHamburger: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#1a202c',
    fontSize: '1.5rem',
    padding: 0,
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4rem 2rem 6rem',
    textAlign: 'center',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    marginBottom: '1rem',
    fontWeight: '600',
  },
  subtitle: {
    marginBottom: '2rem',
    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
    color: '#4a5568',
  },
  ctaButton: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
  },
  footer: {
    backgroundColor: 'white',
    textAlign: 'center',
    padding: '1rem 2rem',
    fontSize: '0.9rem',
    color: 'black',
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30px',
  },
};

export default HomePage;


