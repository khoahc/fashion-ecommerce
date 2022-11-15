import clsx from "clsx";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import ColorFilter from "../../components/ColorFilter";
import FilterSkeleton from "../../components/FilterSkeleton";
import InfinityList from "../../components/InfinityList";
import InfinityListSkeleton from "../../components/InfinityListSkeleton";
import MenuFilter from "../../components/MenuFilter";
import PriceFilter from "../../components/PriceFilter/PriceFilter";
import * as catalogCategory from "../../services/catalogCategory";
import * as colorService from "../../services/color";
import styles from "./Catalog.module.scss";

const Catalog = () => {
  const { slugCategory } = useParams();

  const optionsSort = [
    { value: "priceHighToLow", label: "Giá thấp đến cao" },
    { value: "priceLowToHigh", label: "Giá cao đến thấp" },
    { value: "topSellers", label: "Bán chạy" },
    { value: "newest", label: "Mới nhất" },
  ];

  const [selectedOption, setSelectedOption] = useState([]);

  console.log("option sort: " + selectedOption);
  // -----------------------------------------------------
  const initFilter = {
    category: [],
    color: [],
    price: [],
  };

  let navigate = useNavigate();

  const [productData, setProductData] = useState([]);

  const [products, setProducts] = useState([]);

  const [colorsCategory, setColorsCategory] = useState([]);

  const [category, setCategory] = useState([]);

  const [menuCategory, setMenuCategory] = useState([]);

  //use skeleton
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // const fetchData = async () => {
    //   productList1 = await catalogCategory.getCategoryBySlug(slug);
    //   console.log(productList1);
    // };

    // fetchData();

    Promise.all([
      catalogCategory
        .getCategoryBySlug(slugCategory)
        .then((data) => {
          if (data.status === "OK") {
            setCategory(data.data);
          } else {
            return Promise.reject(new Error(data.message));
          }
        })
        .catch((error) => {
          console.log(error);
          navigate("/error");
        }),

      catalogCategory
        .getAllProductBySlugCategory(slugCategory)
        .then((data) => {
          if (data.status === "OK") {
            setProductData(data.data);
            setProducts(data.data);
            setIsLoading(false);
            console.log("get All product: " + JSON.stringify(data.data));
          } else {
            return Promise.reject(new Error(data.message));
          }
        })
        .catch((error) => {
          console.log(error);
          navigate("/error");
        }),
      catalogCategory
        .getMenuCategory(slugCategory)
        .then((data) => {
          if (data.status === "OK") {
            setMenuCategory(data.data);
            console.log(data.data);
          } else {
            return Promise.reject(new Error(data.message));
          }
        })
        .catch((error) => {
          console.log(error);
          navigate("/error");
        }),

      colorService
        .getAllColorsBySlugCategoty(slugCategory)
        .then((data) => {
          if (data.status === "OK") {
            setColorsCategory(data.data);
          } else {
            setColorsCategory([]);
          }
        })
        .catch((error) => {
          console.log(error);
          navigate("/error");
        }),
    ]);
  }, [slugCategory]);

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
  //---------------------------------------------------------------------

  const [filter, setFilter] = useState(initFilter);

  console.log("filter: ", JSON.stringify(filter));
  const initMenuFilter = {
    ...filter,
    category: [],
  };

  const initColorFilter = {
    ...filter,
    color: [],
  };

  const initPriceFilter = {
    ...filter,
    price: [],
  };

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({ ...filter, category: [...filter.category, item.slug] });
          break;
        case "COLOR":
          setFilter({ ...filter, color: [...filter.color, item.slug] });
          break;
        case "PRICE":
          setFilter({ ...filter, price: [...filter.price, item] });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter((e) => e !== item.slug);
          setFilter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item.slug);
          setFilter({ ...filter, color: newColor });
          break;
        case "PRICE":
          const newPrice = filter.price.filter((e) => !_.isEqual(e, item));
          setFilter({ ...filter, price: newPrice });
          break;
        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);
  const clearMenuFilter = () => setFilter(initMenuFilter);
  const clearColorFilter = () => setFilter(initColorFilter);
  const clearPriceFilter = () => setFilter(initPriceFilter);

  //filter
  const updateProducts = useCallback(() => {
    let temp = productData;
    if (filter.category.length > 0) {
      temp = temp.filter((e) => {
        const check = e.slugCategories.find((category) =>
          filter.category.includes(category.slug)
        );
        console.log("check category: " + JSON.stringify(check));
        return check !== undefined;
      });
    }

    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) =>
          filter.color.includes(color.slug)
        );
        console.log("check color: " + JSON.stringify(check));
        return check !== undefined;
      });
    }

    if (filter.price.length > 0) {
      temp = temp.filter((e) => {
        for (var i = 0; i < filter.price.length; i++) {
          if (
            filter.price.at(i).start <= Number(e.price) &&
            filter.price.at(i).end >= Number(e.price)
          ) {
            return true;
          }
        }
        return false;
      });
    }
    console.log("update product", JSON.stringify("product checked: ", temp));
    setProducts(temp);
  }, [filter]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  return (
    <>
      {/* <img className={clsx(styles.banner)} src={category.image} alt="" /> */}

      <div className={clsx(styles.container)}>
        <Breadcrumb name={category.name} />

        <div
          className={clsx(styles.nav, "py-1", {
            [styles.up]: scrollDirection === "down",
            [styles.down]: scrollDirection === "up",
          })}
        >
          <div>
            <h2 className={clsx(styles.titleCategory)}>
              {isLoading ? <Skeleton width={100} height={30} /> : category.name}
            </h2>
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
                  paddingX={2}
                  paddingY={1}
                  children={"Xóa tất cả"}
                  onClick={clearFilter}
                />

                <div className={clsx(styles.menu)}>
                  <div className={clsx(styles.title)}>
                    <h4>Danh mục</h4>
                    <IconContext.Provider value={{ color: "#444" }}>
                      <div>
                        <FaTrashAlt onClick={clearMenuFilter} />
                      </div>
                    </IconContext.Provider>
                  </div>
                  {/* list menu */}
                  <div className="mt-1">
                    {isLoading ? (
                      <FilterSkeleton />
                    ) : (
                      <MenuFilter
                        menuData={menuCategory}
                        checkedList={filter.category}
                        onChange={filterSelect}
                      />
                    )}
                  </div>
                </div>

                {/* FILTER */}
                <div className={clsx(styles.filter)}>
                  <div className={clsx(styles.colorList)}>
                    <div className={clsx(styles.title)}>
                      <h4>Màu sắc</h4>
                      <IconContext.Provider value={{ color: "#444" }}>
                        <div>
                          <FaTrashAlt onClick={clearColorFilter} />
                        </div>
                      </IconContext.Provider>
                    </div>
                    {/* list color */}
                    <div className="mt-1">
                      {isLoading ? (
                        <FilterSkeleton />
                      ) : (
                        <ColorFilter
                          colorsData={colorsCategory}
                          checkedList={filter.color}
                          onChange={filterSelect}
                        />
                      )}
                    </div>
                  </div>
                  <div className={clsx(styles.priceList)}>
                    <div className={clsx(styles.title)}>
                      <h4>Giá</h4>
                      <IconContext.Provider value={{ color: "#444" }}>
                        <div>
                          <FaTrashAlt onClick={clearPriceFilter} />
                        </div>
                      </IconContext.Provider>
                    </div>
                    {/* list price */}
                    <div className="mt-1 mb-2">
                      {isLoading ? (
                        <FilterSkeleton />
                      ) : (
                        <PriceFilter
                          onChange={filterSelect}
                          checkedList={filter.price}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* list product */}
            <div className={clsx(styles.right)}>
              {products.length > 0 ? (
                <div className={clsx(styles.listProduct)}>
                  {isLoading ? (
                    <InfinityListSkeleton />
                  ) : (
                    <InfinityList data={products} />
                  )}
                </div>
              ) : (
                <h2 className="text-center">Không tìm thấy sản phẩm nào!</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
