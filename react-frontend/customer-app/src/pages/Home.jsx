import React from "react";

import TopProduct from "../components/TopProduct";
import topProductData from "../assets/fake-data/top-product";
// import Header from "../components/Header";

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <TopProduct title="Top sản phẩm bán chạy" listProduct={topProductData}/>

      <div>shop Banner</div>
    </>
  );
};

export default Home;
