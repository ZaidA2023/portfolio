import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Slideshow = () => {
  const slides = [
    { id: 1, img: '/images/Jerry.png' },
    { id: 2, img: '/images/Ray.png' },
    { id: 3, img: '/images/flaps.png' },
    { id: 4, img: '/images/capsule.png' },
  ];

  
  return (
    <div className="wrapper w-full bg-transparent">
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