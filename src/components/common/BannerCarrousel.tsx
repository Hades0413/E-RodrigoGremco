import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

// Importar imágenes
import img1 from '../../assets/img/img1.png';
import img2 from '../../assets/img/img2.png';
import img3 from '../../assets/img/img3.png';
import img4 from '../../assets/img/img4.png';

// Importar iconos personalizados
import ThumbsUpIcon from '../icons/ThumbsUpIcon';
import GamepadIcon from '../icons/GamepadIcon';
import MultiplayerIcon from '../icons/MultiplayerIcon';
import AchievementIcon from '../icons/AchievementIcon';
import PlayArrow from '../icons/PlayIcon';
import AccessTime from '../icons/AccessTime';
import Star from '../icons/Star';
import Category from '../icons/Category';

interface BannerItem {
  title: string;
  playTime: string;
  rating: string;
  categories: string[];
  description: string;
  image: string;
}

const bannerData: BannerItem[] = [
  {
    title: "The Witcher 3: Wild Hunt",
    playTime: "100+ horas",
    rating: "9.8/10",
    categories: ["RPG", "Mundo Abierto", "Fantasía"],
    description: "Embárcate en una épica aventura en un vasto mundo abierto lleno de monstruos, intrigas y decisiones morales complejas.",
    image: img1
  },
  {
    title: "Cyberpunk 2077",
    playTime: "60+ horas",
    rating: "8.5/10",
    categories: ["RPG", "Futurista", "Acción"],
    description: "Sumérgete en Night City, una metrópolis obsesionada con el poder, el glamour y las modificaciones corporales.",
    image: img2
  },
  {
    title: "Elden Ring",
    playTime: "80+ horas",
    rating: "9.5/10",
    categories: ["Souls-like", "Mundo Abierto", "Fantasía Oscura"],
    description: "Explora las Tierras Intermedias y descubre los misterios del Anillo de Elden en este desafiante RPG de acción.",
    image: img3
  },
  {
    title: "Red Dead Redemption 2",
    playTime: "120+ horas",
    rating: "9.7/10",
    categories: ["Acción-Aventura", "Mundo Abierto", "Western"],
    description: "Vive la épica historia de Arthur Morgan y la banda de Van der Linde en el ocaso del Salvaje Oeste americano.",
    image: img4
  },
];

const BannerCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerData.length) % bannerData.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []); 

  return (
    <div className="banner-slider">
      {bannerData.map((banner, index) => (
        <Card
          key={index}
          className={`banner-slide ${index === currentSlide ? 'active' : ''}`}
        >
          <div className="banner-image-container">
            <img src={banner.image} alt={banner.title} className="banner-image" />
            <div className="banner-overlay"></div>
          </div>
          <CardContent className="banner-content">
            <Typography variant="h3" component="h2" className="banner-title">
              {banner.title}
            </Typography>
            <div className="banner-meta">
              <span><AccessTime /> {banner.playTime}</span>
              <span><Star /> {banner.rating}</span>
            </div>
            <div className="banner-tags">
              {banner.categories.map((category, catIndex) => (
                <span key={catIndex} className="banner-tag">
                  <Category /> {category}
                </span>
              ))}
            </div>
            <Typography variant="body1" className="banner-description">
              {banner.description}
            </Typography>
            <div className="banner-icons">
              <ThumbsUpIcon />
              <GamepadIcon />
              <MultiplayerIcon />
              <AchievementIcon />
            </div>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PlayArrow />}
              className="banner-button"
            >
              Jugar Ahora
            </Button>
          </CardContent>
        </Card>
      ))}
      <button className="banner-nav banner-prev" onClick={prevSlide}>
        &lt;
      </button>
      <button className="banner-nav banner-next" onClick={nextSlide}>
        &gt;
      </button>
      <style>{`
      .css-1lt5qva-MuiCardContent-root:last-child{
      padding-bottom:80px;
      padding-left:120px;
      }
        .banner-slider {
          position: relative;
          width: 100%;
          height: 90vh;
          overflow: hidden;
        }
        .banner-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        .banner-slide.active {
          opacity: 1;
        }
        .banner-image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .banner-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(to top, rgb(0 0 0 / 75%) 0%, rgb(80 74 91 / 20%) 100%)
        }
        .banner-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 3rem;
          color: white;
        }
        .banner-title {
          margin-bottom: 1rem;
          font-size: 3rem;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .banner-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 1.2rem;
        }
        .banner-meta span {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .banner-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .banner-tag {
          background-color: rgba(139, 92, 246, 0.8);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .banner-description {
          margin-bottom: 1rem;
          font-size: 1.1rem;
          max-width: 60%;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .banner-icons {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .banner-icons svg {
          width: 24px;
          height: 24px;
          fill: white;
        }
        .banner-button {
          background-color: #6D28D9 !important;
          color: white !important;
          font-size: 1.2rem !important;
          padding: 0.5rem 2rem !important;
        }
        .banner-button:hover {
          background-color: #5B21B6 !important;
        }
        .banner-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(109, 40, 217, 0.8);
          color: white;
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .banner-nav:hover {
          background-color: rgba(109, 40, 217, 1);
        }
        .banner-prev {
          left: 2rem;
        }
        .banner-next {
          right: 2rem;
        }

        @media (max-width: 768px) {
        .css-1lt5qva-MuiCardContent-root:last-child{
      padding-bottom:80px;
      padding-left:40px;
      }
          .banner-content {
            padding: 1.5rem;
          }
          .banner-title {
            font-size: 2rem;
          }
          .banner-meta {
            font-size: 1rem;
          }
          .banner-tag {
            font-size: 0.8rem;
            padding: 0.3rem 0.8rem;
          }
          .banner-description {
            font-size: 0.9rem;
            max-width: 100%;
          }
          .banner-button {
            font-size: 1rem !important;
            padding: 0.4rem 1.5rem !important;
          }
          .banner-nav {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
          .banner-prev {
            left: 1rem;
          }
          .banner-next {
            right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default BannerCarousel;