import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TITLES = ['Study', 'Play1', 'Play2', 'Play3', 'Play4', 'Play5']
const TOTAL_SLIDES = TITLES.length;

const GameSlider = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div style={styles.section}>
      <div style={styles.wrapper}>
        <Slider {...settings}>
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <div key={i}>
              <div style={styles.card}>
                <img
                  src="/geogame/demo2.PNG"
                  alt={`Image ${i + 1}`}
                  style={styles.cardImage}
                />
                <div style={styles.cardText}>{TITLES[i]}</div>
              </div>
            </div>
          ))}
        </Slider>
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
    width: '100%',
    maxWidth: '1400px',
  },
  card: {
    height: '350px',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    margin: '0 8px',
    border: '5px solid white',
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

export default GameSlider;










