import React, { useState, useEffect, useCallback, useRef } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "../../styles/Home/Banner.css";
import img1 from "../../assets/img/img1.png";
import img2 from "../../assets/img/img2.png";
import img3 from "../../assets/img/img3.png";
import img4 from "../../assets/img/img4.png";

import ThumbsUpIcon from "../icons/ThumbsUpIcon";
import GamepadIcon from "../icons/GamepadIcon";
import MultiplayerIcon from "../icons/MultiplayerIcon";
import AchievementIcon from "../icons/AchievementIcon";
import PlayArrow from "../icons/PlayIcon";
import AccessTime from "../icons/AccessTime";
import Star from "../icons/Star";
import Category from "../icons/Category";

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
    description:
      "Embárcate en una épica aventura en un vasto mundo abierto lleno de monstruos, intrigas y decisiones morales complejas.",
    image: img1,
  },
  {
    title: "Cyberpunk 2077",
    playTime: "60+ horas",
    rating: "8.5/10",
    categories: ["RPG", "Futurista", "Acción"],
    description:
      "Sumérgete en Night City, una metrópolis obsesionada con el poder, el glamour y las modificaciones corporales.",
    image: img2,
  },
  {
    title: "Elden Ring",
    playTime: "80+ horas",
    rating: "9.5/10",
    categories: ["Souls-like", "Mundo Abierto", "Fantasía Oscura"],
    description:
      "Explora las Tierras Intermedias y descubre los misterios del Anillo de Elden en este desafiante RPG de acción.",
    image: img3,
  },
  {
    title: "Red Dead Redemption 2",
    playTime: "120+ horas",
    rating: "9.7/10",
    categories: ["Acción-Aventura", "Mundo Abierto", "Western"],
    description:
      "Vive la épica historia de Arthur Morgan y la banda de Van der Linde en el ocaso del Salvaje Oeste americano.",
    image: img4,
  },
];

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isQuickTransition, setIsQuickTransition] = useState(false);
  const [isRewinding, setIsRewinding] = useState(false); // Para controlar el "rebobinado"
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev === bannerData.length - 1) {
          // Iniciar el "rebobinado"
          setIsQuickTransition(true);
          setIsRewinding(true);
          return 0;
        } else {
          setIsQuickTransition(false);
          return prev + 1;
        }
      });
    }, 10000); // 20 segundos entre transiciones
  }, []);

  const changeSlide = useCallback(
    (newSlide: number) => {
      setCurrentSlide(newSlide);
      setIsQuickTransition(false);
      setIsRewinding(false); // Terminar "rebobinado"
      resetTimer();
    },
    [resetTimer]
  );

  const nextSlide = useCallback(() => {
    const nextIndex = (currentSlide + 1) % bannerData.length;
    changeSlide(nextIndex);
  }, [currentSlide, changeSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex =
      (currentSlide - 1 + bannerData.length) % bannerData.length;
    changeSlide(prevIndex);
  }, [currentSlide, changeSlide]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [resetTimer]);

  return (
    <div className="banner-slider">
      {bannerData.map((banner, index) => (
        <Card
          key={index}
          className={`banner-slide ${index === currentSlide ? "active" : ""}`}
          style={{
            transform: `translateX(${(index - currentSlide) * 100}%)`,
            transition: isRewinding
              ? "transform 0.7s ease-in-out" // Transición rápida para el "rebobinado"
              : isQuickTransition
              ? "transform 0.1s ease-in-out" // Cambio rápido al primer slide
              : "transform 0.5s ease-in-out", // Transición normal
          }}
        >
          <div className="banner-image-container">
            <img
              src={banner.image}
              alt={banner.title}
              className="banner-image"
            />
            <div className="banner-overlay"></div>
          </div>
          <CardContent className="banner-content">
            <Typography variant="h3" component="h2" className="banner-title">
              {banner.title}
            </Typography>
            <div className="banner-meta">
              <span>
                <AccessTime /> {banner.playTime}
              </span>
              <span>
                <Star /> {banner.rating}
              </span>
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
    </div>
  );
};

export default Banner;
