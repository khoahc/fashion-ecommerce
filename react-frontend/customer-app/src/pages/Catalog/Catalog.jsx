import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import Select from "react-select";
import clsx from "clsx";

import styles from "./Catalog.module.scss";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import InfinityList from "../../components/InfinityList";
import { getCategoryBySlug } from "../../assets/fake-data/category";
import productData from "../../assets/fake-data/products";

const Catalog = () => {
  const { pathname } = useLocation();
  const slug = pathname.slice(3);
  const category = getCategoryBySlug(slug);
  console.log(JSON.stringify(category));

  const optionsSort = [
    { value: "priceHighToLow", label: "Giá thấp đến cao" },
    { value: "priceLowToHigh", label: "Giá cao đến thấp" },
    { value: "topSellers", label: "Bán chạy" },
    { value: "newest", label: "Mới nhất" },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  console.log(selectedOption);
  // -----------------------------------------------------
  const initFilter = {
    category: [],
    color: [],
    size: [],
  };

  const productList = productData.getAllProducts();

  const [products, setProducts] = useState(productList);

  //scroll
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  });

  return (
    <>
      <img className={clsx(styles.banner)} src={category.image} alt="image-category" />

      <div className={clsx(styles.container)}>
        <Breadcrumb name={category.name} />

        <div
          className={clsx(styles.nav, "py-1", {
            [styles.up]: scrollDirection === "down",
            [styles.down]: scrollDirection === "up",
          })}
        >
          <div>
            <h2 className={clsx(styles.titleCategory)}>Đồ {category.name}</h2>
          </div>
          <div className={clsx(styles.sort)}>
            <Select
              isSearchable={false}
              placeholder={"Sắp xếp theo"}
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={optionsSort}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "orange",
                  primary: "black",
                },
              })}
            />
          </div>
        </div>

        <hr
          style={{
            boxShadow: "0px 0.2px #888888",
          }}
        />

        <div className={clsx(styles.wrap)}>
          <div className={clsx(styles.content)}>
            <div
              className={clsx(styles.left, {
                [styles.up]: scrollDirection === "down",
                [styles.down]: scrollDirection === "up",
              })}
            >
              <div className="mr-1">
                {/* Button component */}
                <Button
                  border={true}
                  children={"Xóa tất cả"}
                  onClick={() => {}}
                />

                <div className={clsx(styles.menu)}>
                  <div className={clsx(styles.title)}>
                    <h4>Danh mục</h4>
                    <IconContext.Provider value={{ color: "#444" }}>
                      <div>
                        <FaTrashAlt />
                      </div>
                    </IconContext.Provider>
                  </div>
                  {/* list menu */}
                  <div className=""></div>
                </div>

                {/* filter */}
                <div className={clsx(styles.filter)}>
                  <div className={clsx(styles.colorList)}>
                    <div className={clsx(styles.title)}>
                      <h4>Màu sắc</h4>
                      <IconContext.Provider value={{ color: "#444" }}>
                        <div>
                          <FaTrashAlt />
                        </div>
                      </IconContext.Provider>
                    </div>
                    {/* list color */}
                    <div className=""></div>
                  </div>
                  <div className={clsx(styles.priceList)}>
                    <div className={clsx(styles.title)}>
                      <h4>Giá</h4>
                      <IconContext.Provider value={{ color: "#444" }}>
                        <div>
                          <FaTrashAlt />
                        </div>
                      </IconContext.Provider>
                    </div>
                    {/* list price */}
                  </div>
                </div>
              </div>
            </div>

            {/* list product */}
            <div className={clsx(styles.right)}>
              <div className={clsx(styles.listProduct)}>
                <InfinityList data={products} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
