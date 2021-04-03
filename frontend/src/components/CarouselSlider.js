import React, { useState } from "react";
import { CarouselData } from "./CarouselData";

import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import "../Styles/scss/Carousel.scss";
const CarouselSlider = ({ slide }) => {
  const [current, setCurrent] = useState(0);
  const length = slide.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  console.log(current);

  if (!Array.isArray(slide) || slide.length <= 0) {
    return null;
  }

  return (
    <div className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {CarouselData.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={slide.image} height={600} className="image" alt="books" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CarouselSlider;
