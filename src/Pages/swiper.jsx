import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../sstyle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import page1 from '../assets/Screenshot/page1.webp';
import page2 from '../assets/Screenshot/page2.jpeg';
import page3 from '../assets/Screenshot/page3.webp';
import page4 from '../assets/Screenshot/page4.webp';
import page5 from '../assets/Screenshot/page5.webp';
import page6 from '../assets/Screenshot/page6.jpg';
import page9 from '../assets/Screenshot/page9.jpg';
import page10 from '../assets/Screenshot/page10.jpeg';
import page11 from '../assets/Screenshot/page11.jpeg';
import page12 from '../assets/Screenshot/page12.webp';
import page13 from '../assets/Screenshot/page13.jpeg';

export default function App() {
  const pages = [
    page1, page2, page3, page4, page5,
    page6, page9, page10, page11, page12, page13
  ];

  return (
    <Swiper
      spaceBetween={20}
      centeredSlides={false}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation={true}
      loop={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"

      // 👇 This part controls slides per screen
      breakpoints={{
        0: {        // mobile (0px and up)
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {      // tablet and up
          slidesPerView: 2,
          spaceBetween: 15,
        },
        1024: {     // pc and up
          slidesPerView: 3,
          spaceBetween: 20,
        },
      }}
    >
      {pages.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img} alt={`Page ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
