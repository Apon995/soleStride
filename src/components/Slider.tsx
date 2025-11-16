"use client";

import { useRef, useEffect, useState } from "react";
import styles from "@/styles/Slider.module.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SliderItems } from "@/Fakedata/Slider";
import Image from "next/image";

export interface SliderItem {
  id: number;
  image: string;
  title: string;
  topic: string;
  shortDesc: string;
  detailTitle: string;
  longDesc: string;
  price: string;
  material: string;
  fit: string;
  sole: string;
  closure: string;
}

const CarouselSlider = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const autoSlideInterval = useRef<NodeJS.Timeout | null>(null);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSlider = (type: "next" | "prev") => {
    if (!listRef.current) return;

    setDirection(type);

    const items = listRef.current.children;
    if (type === "next" && items.length > 0) {
      listRef.current.appendChild(items[0]);
    } else if (items.length > 0) {
      listRef.current.prepend(items[items.length - 1]);
    }

    setTimeout(() => {
      setDirection(null);
    }, 1100);
  };

  const handleTouch = (e: React.TouchEvent) => {
    const touchStartX = e.changedTouches[0].screenX;

    const handleTouchEnd = (endEvent: TouchEvent) => {
      const touchEndX = endEvent.changedTouches[0].screenX;
      const swipeThreshold = 50;

      if (touchEndX < touchStartX - swipeThreshold) {
        showSlider("next");
      } else if (touchEndX > touchStartX + swipeThreshold) {
        showSlider("prev");
      }

      restartAutoSlide();
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchend", handleTouchEnd);
  };

  const startAutoSlide = () => {
    autoSlideInterval.current = setInterval(() => {
      showSlider("next");
    }, 8000);
  };

  const restartAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
    startAutoSlide();
  };

  // useEffect(() => {
  //   startAutoSlide();
  //   return () => {
  //     if (autoSlideInterval.current) {
  //       clearInterval(autoSlideInterval.current);
  //     }
  //   };
  // });

  return (
    <div
      ref={carouselRef}
      className={`${styles.carousel} ${styles.sliderContainer}
                  ${direction ? styles[direction] : ""} `}
      onTouchStart={handleTouch}
    >
      <div ref={listRef} className={styles.list}>
        {SliderItems.map((item: SliderItem, index: number) => (
          <div
            key={index}
            className={`${styles.item} text-black dark:bg-transparent dark:text-white`}
          >
            <Image fill sizes="100" src={item.image} alt={item.topic} />

            <div className={`${styles.introduce}`}>
              <div className={`${styles.title} dark:text-white text-black`}>
                {item.title}
              </div>
              <div className={`${styles.topic} dark:text-white text-black`}>
                {item.topic}
              </div>
              <div className={`${styles.des} dark:text-gray-300 text-[#5559]`}>
                {item.shortDesc}
              </div>
              <button
                className={`${styles.seeMore} dark:text-white text-black `} 
              >
                SEE MORE ↗
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        className={` ${styles.arrows} ${
          scrolled ? "opacity-0 invisible" : "opacity-100 visible"
        }}`}
      >
        <button
          className={`${styles.prevButton} text-black dark:text-white`}
          onClick={() => showSlider("prev")}
        >
          <ChevronLeft />
        </button>
        <button
          className={`${styles.nextButton} text-black dark:text-white `}
          onClick={() => showSlider("next")}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CarouselSlider;
