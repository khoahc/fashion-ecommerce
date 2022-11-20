import { Link } from "react-router-dom";

// Import Swiper React components
import { A11y, Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/autoplay";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";

import Product from "../Product";

export default (props) => {
  const listData = props.data;
  const listItems = listData?.map((item, index) =>
    item.colors.length > 0 ? (
      <SwiperSlide key={index}>
        <Link to={`/p/${item.slug}?color=${item.colors[0].slug}`}>
          <Product product={item} />
        </Link>
      </SwiperSlide>
    ) : (
      ""
    )
  );

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
