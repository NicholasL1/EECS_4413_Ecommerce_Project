import MensBanner from "@/components/hero/MensBanner";
import WomensBanner from "@/components/hero/WomensBanner";
import KidsBanner from "@/components/hero/KidsBanner";
import SalesBanner from "@/components/hero/SaleBanner";
import React, { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const slides = [
  <MensBanner key="mens" />,
  <WomensBanner key="womens" />,
  <KidsBanner key="kids" />,
  <SalesBanner key="sales" />,
];
function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section className="relative px-4 py-16 m-auto w-full max-w-[1600px] h-[780px] rounded-xl">
      <div className="relative w-full h-full rounded-2xl overflow-hidden group">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full bg-center bg-cover"
            >
              {slide}
            </div>
          ))}
        </div>
        {/* left arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/80">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* right arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/80">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`text-2xl cursor-pointer ${
              currentIndex === index ? "text-custom-red" : "text-black"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Carousel;
