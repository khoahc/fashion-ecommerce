import React, { useEffect, useState } from "react";

import CategoryBanner from "../components/CategoryBanner";
import TopProduct from "../components/TopProduct";
import * as catalogCategory from "../services/catalogCategory";
import * as product from "../services/product";

const Home = () => {
  // const [data, setData] = useState([]);

  const [categoryData, setCategoryData] = useState([]);
  const [topSellingProductsData, setTopSellingProductsData] = useState();
  const [topNewProductsData, setTopNewProductsData] = useState({});

  useEffect(() => {
    Promise.all([
      catalogCategory
        .getAllRootCategory()
        .then((data) => {
          setCategoryData(data.status);
          if (data.status === "OK") {
            setCategoryData(data.data);
            console.log("categoryData :>> ", categoryData);
          } else {
            return Promise.reject(new Error(data.message));
          }
        })
        .catch((error) => {
          console.log("error", error);
        }),

      product
        .getTopSellingProducts()
        .then((data) => {
          console.log("data.status :>> ", data.data.status);
          if (data.data.status === "OK") {
            setTopSellingProductsData(data.data.data);
          } else {
            return Promise.reject(new Error(data.message));
          }
        })
        .catch((error) => {
          console.log("error", error);
        }),

      product
        .getTopNewProducts()
        .then((data) => {
          if (data.data.status === "OK") {
            console.log("new :>> ", data.data.data);

            setTopNewProductsData(data.data.data);
          } else {
            return Promise.reject(new Error(data.message));
          }
        })
        .catch((error) => {
          console.log("error", error);
        }),
    ]);
  }, []);

  // const [topProductData, setTopProductData] = useState([
  //   topSellingProductsData,
  //   topNewProductsData,
  // ]);

  // console.log("topProductData :>> ", topProductData);

  // const pushData = (i) => {
  //   data.push({
  //     topProducts: topProductData.at(i),
  //     category: categoryData.at(i),
  //   });
  // };

  // useEffect(() => {
  //   if (topProductData.length > categoryData.length) {
  //     for (let i = 0; i < topProductData.length; i++) {
  //       console.log("first", 123);
  //       // pushData(i);
  //       setData([
  //         ...data,
  //         {
  //           topProducts: topProductData.at(i),
  //           category: categoryData.at(i),
  //         },
  //       ]);
  //     }
  //   } else {
  //     for (let i = 0; i < categoryData.length; i++) {
  //       // pushData(i);
  //       setData([
  //         ...data,
  //         {
  //           topProducts: topProductData.at(i),
  //           category: categoryData.at(i),
  //         },
  //       ]);
  //     }
  //   }
  // }, [categoryData, topProductData]);

  // console.log("Data: " + JSON.stringify(data, null, 2));

  return (
    <div className="bg-white">
      {topSellingProductsData && (
        <TopProduct
          title={topSellingProductsData.title}
          listProduct={topSellingProductsData.data}
        />
      )}
      {categoryData !== null &&
        categoryData.map((item, index) => (
          <div key={index}>
            {index === 1 && topNewProductsData && (
              <TopProduct
                title={topNewProductsData.title}
                listProduct={topNewProductsData.data}
              />
            )}
            <CategoryBanner category={item} index={index} />
          </div>
        ))}
    </div>
  );
};

export default Home;
