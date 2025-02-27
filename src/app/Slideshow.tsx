import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Slideshow = () => {
  const slides = [
    { id: 1, img: '/images/Mootaz.jpg' },
    { id: 2, img: '/images/Ray_reflect.jpg' },
    { id: 3, img: '/images/Mootaz.jpg' },
    { id: 4, img: '/images/Ray_reflect.jpg' },
    { id: 5, img: '/images/Mootaz.jpg' },
    { id: 6, img: '/images/Ray_reflect.jpg' },
  ];

  
  return (
    <div className="wrapper w-full">
      <Splide
        options={{
          type: 'loop',
          arrows: false,
          pagination: false,
          perPage: 3,
        }}
      >
        {slides.map((slide) => (
          <SplideSlide key={slide.id}>
            <img
              src={slide.img}
              alt={`Slide ${slide.id}`}
              className="slide-img"
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Slideshow;