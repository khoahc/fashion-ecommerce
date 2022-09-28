import React from "react";

import topProductData from "../assets/fake-data/top-product";
import categoryData from "../assets/fake-data/category";
import TopProduct from "../components/TopProduct";
import CategoryBanner from "../components/CategoryBanner";

const Home = () => {
  const data = [];
  if (topProductData.length > categoryData.length) {
    for (let i = 0; i < topProductData.length; i++) {
      pushData(i);
    }
  } else {
    for (let i = 0; i < categoryData.length; i++) {
      pushData(i);
    }
  }

  function pushData(i) {
    data.push({
      topProducts: topProductData.at(i),
      category: categoryData.at(i),
    });
  }

  const listTopProductAndCategoryBanner = data.map((item, index) => (
    <div key={index}>
      <TopProduct title={item.topProducts.title} listProduct={item.topProducts.data} />
      <CategoryBanner category={item.category} index={index} />
    </div>
  ));

  console.log("Data: " + JSON.stringify(data, null, 2));

  return (
    <>   
      {listTopProductAndCategoryBanner}
    </>
  );
};

export default Home;
