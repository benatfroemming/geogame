import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Slider from '../components/Slider';

const HomePage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [darkMode, setDarkMode] = useState(false);
  const secondSectionRef = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const navItems = [
    { label: 'Play', path: '/map', scrollTo: null },
    { label: 'Guide', path: null, scrollTo: null },
    { label: 'About', path: null, scrollTo: null },
    {
      label: <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />,
      path: null,
      scrollTo: null,
      onClick: toggleDarkMode,
    }
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
    if (item.onClick) {
      item.onClick();
    } else if (item.scrollTo === 'secondSection') {
      scrollToSection();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  // Dynamic styles based on dark mode
  const wrapperStyle = {
    ...styles.wrapper,
    backgroundColor: darkMode ? '#1a202c' : '#fff',
    color: darkMode ? '#f7fafc' : '#1a202c',
  };

  const navButtonStyle = {
    ...styles.navButton,
    color: darkMode ? '#f7fafc' : '#1a202c',
  };

  const headerStyle = {
    ...(isMobile ? styles.headerMobile : styles.header),
    backgroundColor: darkMode ? '#2d3748' : '#fff',
    borderBottom: `1px solid ${darkMode ? '#4a5568' : '#e2e8f0'}`,
  };

  const footerStyle = {
    ...styles.footer,
    backgroundColor: darkMode ? '#1a202c' : '#fff',
    color: darkMode ? '#f7fafc' : '#1a202c',
  };

  const mobileNavStyle = {
    ...styles.mobileNav,
    backgroundColor: darkMode ? '#2d3748' : '#fff',
  };

  const faHamburgerStyle = {
    ...styles.faHamburger,
    color: darkMode ? '#f7fafc' : '#1a202c',
  };

  const secondSectionStyle = {
    backgroundColor: darkMode ? '#2d3748' : '#f9fafb',
    color: darkMode ? '#f7fafc' : '#1a202c',
  };


  return (
    <div style={wrapperStyle}>
      <header style={headerStyle}>
        <div style={styles.logo}>Lurmap</div>
        {isMobile ? (
          <>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={faHamburgerStyle}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
            {menuOpen && (
              <nav style={mobileNavStyle}>
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    style={navButtonStyle}
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
                style={navButtonStyle}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <main style={styles.main}>
        <h1 style={styles.title}>Welcome to Lurmap</h1>
        <p style={{ ...styles.subtitle, color: darkMode ? '#a0aec0' : '#4a5568' }}>
          Bringing map games into the modern era.
        </p>
        <button onClick={scrollToSection} style={styles.ctaButton}>
          Start Playing
        </button>
      </main>

      <section ref={secondSectionRef} style={secondSectionStyle}>
        <Slider darkMode={darkMode}/>
        <style>
          {`
            [data-card]:hover {
              transform: scale(1.05);
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            }
          `}
        </style>
      </section>

      <footer style={footerStyle}>
        <p style={{ margin: 0 }}>© {new Date().getFullYear()} Lurmap. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Static styles
const styles = {
  wrapper: {
    fontFamily: 'system-ui, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    zIndex: 1000,
  },
  headerMobile: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
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
    cursor: 'pointer',
    padding: '0.25rem 0.5rem',
  },
  faHamburger: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
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
    textAlign: 'center',
    padding: '1rem 2rem',
    fontSize: '0.9rem',
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '30px',
  },
};

export default HomePage;



