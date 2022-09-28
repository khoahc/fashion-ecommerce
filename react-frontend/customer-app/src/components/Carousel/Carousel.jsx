import { useRef } from "react";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css/autoplay";

import Product from "../Product";

export default (props) => {
  const listData = props.data;
  const listItems = listData.map((item, index) => (
    <SwiperSlide key={index}>
      <Link to={"/p/" + item.slug}>
        <Product product={item} />
      </Link>
    </SwiperSlide>
  ));
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={20}
      slidesPerView={3}
      autoplay={{ delay: 2000 }}
      navigation
      pagination={{ clickable: true }}
    >
      {listItems}
    </Swiper>
  );
};
