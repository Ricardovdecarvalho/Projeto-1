import React, { useState, useEffect, ReactNode } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import 'swiper/css';

import * as s from './styles';

type SliderProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode[];
};

const Slider = ({ title, subtitle, children }: SliderProps) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [last, setLast] = useState(false);

  useEffect(() => {
    if (!children) return;

    if (activeIndex === children.length - 1) {
      setLast(true);
    } else {
      setLast(false);
    }
  }, [activeIndex, children]);

  if (!children) return null;
  return (
    <s.Container>
      <s.Header>
        {title && <h2>{title}</h2>}
        {subtitle && <strong>{subtitle}</strong>}
        {swiper?.currentBreakpoint !== '1100' && (
          <s.SwiperHandles>
            <s.PrevButton onClick={() => swiper?.slidePrev()} />

            <s.NextButton onClick={() => swiper?.slideNext()} />
          </s.SwiperHandles>
        )}
      </s.Header>

      <s.List
        className={`${last ? 'last' : ''} ${activeIndex > 0 ? 'started' : ''}`}
      >
        <s.ListContent className={activeIndex === 0 ? 'first' : ''}>
          <Swiper
            onInit={(e) => setSwiper(e)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="mySwiper"
            breakpoints={{
              1100: {
                slidesPerView: 4,
                spaceBetween: 20,
                centeredSlides: false
              },
              780: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true
              },
              500: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: true
              },
              0: {
                slidesPerView: 1.3,
                spaceBetween: 20,
                centeredSlides: true
              }
            }}
          >
            {children.map((item, index) => (
              <SwiperSlide key={index}>{item}</SwiperSlide>
            ))}
          </Swiper>
        </s.ListContent>
      </s.List>
    </s.Container>
  );
};

export default Slider;
