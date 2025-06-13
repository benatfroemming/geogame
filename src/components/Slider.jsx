import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Slider = () => {
  const sliderRef = useRef(null);
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const card = slider.querySelector('[data-card]');
    if (!card) return;

    const style = getComputedStyle(card);
    const gap = parseInt(style.marginRight) || 0;
    const cardWidth = card.offsetWidth + gap;

    slider.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div style={styles.section}>
      <div style={styles.wrapper}>
        <button
          aria-label="Scroll Left"
          style={{
            ...styles.scrollButton,
            left: '-50px', // outside slider on the left
            transform: hoverLeft ? 'scale(1.2)' : 'scale(1)',
          }}
          onClick={() => scrollSlider('left')}
          onMouseEnter={() => setHoverLeft(true)}
          onMouseLeave={() => setHoverLeft(false)}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="2x" />
        </button>

        <div ref={sliderRef} style={styles.slider}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={styles.card}
              data-card
            >
              <img
                src="/geogame/demo2.PNG"
                alt={`Image ${i + 1}`}
                style={styles.cardImage}
              />
              <div style={styles.cardText}>Game Title {i + 1}</div>
            </div>
          ))}
        </div>

        <button
          aria-label="Scroll Right"
          style={{
            ...styles.scrollButton,
            right: '-50px', // outside slider on the right
            transform: hoverRight ? 'scale(1.2)' : 'scale(1)',
          }}
          onClick={() => scrollSlider('right')}
          onMouseEnter={() => setHoverRight(true)}
          onMouseLeave={() => setHoverRight(false)}
        >
          <FontAwesomeIcon icon={faChevronRight} size="2x" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  section: {
    backgroundColor: '#007bff',
    padding: '4rem 2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    position: 'relative',
    width: '90%',
    display: 'flex',
    alignItems: 'center',
  },
  scrollButton: {
    position: 'absolute',
    top: '50%',
    transformOrigin: 'center',
    borderRadius: '50%',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    padding: '0.5rem 0.75rem',
    transition: 'transform 0.2s ease',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    outline: 'none',
    backgroundColor: 'transparent'
    },

  slider: {
    display: 'flex',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollBehavior: 'smooth',
    gap: '1rem',
    padding: '1rem 0',

    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE 10+
    width: '100%',
  },
  card: {
    width: '300px',
    height: '350px',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    scrollSnapAlign: 'start',
    flexShrink: 0,
    cursor: 'pointer',
    border: '5px solid white',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardImage: {
    width: '100%',
    height: '80%',
    objectFit: 'cover',
  },
  cardText: {
    padding: '0.5rem',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: '1rem',
    color: '#1a202c',
  },
};

export default Slider;


