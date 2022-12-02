import Button from "@mui/material/Button";
import clsx from "clsx";
import _ from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import { MdFilterAlt } from "react-icons/md";

import { useNavigate, useSearchParams } from "react-router-dom";
import MyButton from "../../components/Button";
import ColorFilter from "../../components/ColorFilter";
import FilterSkeleton from "../../components/FilterSkeleton";
import InfinityList from "../../components/InfinityList";
import InfinityListSkeleton from "../../components/InfinityListSkeleton";
import PriceFilter from "../../components/PriceFilter/PriceFilter";
import * as colorService from "../../services/color";
import * as productService from "../../services/product";
import styles from "./Search.module.scss";

const Search = () => {
  let navigate = useNavigate();

  const initFilter = {
    category: [],
    color: [],
    price: [],
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword"));

  const [products, setProducts] = useState([]);

  const [productData, setProductData] = useState([]);

  const [colors, setColors] = useState([]);

  //use skeleton
  const [isLoading, setIsLoading] = useState(true);

  //scroll
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    setKeyword(searchParams.get("keyword"));
  }, [searchParams]);

  useEffect(() => {
    Promise.all([
      productService
        .getProducts(keyword)
        .then((data) => {
          if (data.data.status === "OK") {
            setProducts(data.data.data);
            setProductData(data.data.data);
          } else {
            return Promise.reject(new Error(data.data.message));
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        }),

      colorService
        .getAllColors()
        .then((data) => {
          if (data.status === "OK") {
            setColors(data.data);
          } else {
            return Promise.reject(new Error(data.message));
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        }),
    ]);
  }, [keyword]);

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
  const filterLeft = useRef(null);

  const filterToggle = () => filterLeft.current.classList.toggle(styles.active);

  return (
    <>
      <div className={clsx(styles.container)}>
        <h2 className="mb-2 ml-2">Kết quả tìm kiếm cho "{keyword}"</h2>
        <div className={clsx(styles.filterMobileToggle)}>
          <Button
            variant="outlined"
            startIcon={<MdFilterAlt />}
            style={{
              margin: "10px auto",
              borderRadius: 1,
              color: "#000",
              textTransform: "capitalize",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              padding: "5px 20px",
              fontSize: "0.85rem",
            }}
            onClick={filterToggle}
          >
            Lọc
          </Button>
        </div>

        <div className={clsx(styles.wrap)}>
          <div className={clsx(styles.content)}>
            <div
              className={clsx(styles.left, {
                [styles.up]: scrollDirection === "down",
                [styles.down]: scrollDirection === "up",
              })}
              ref={filterLeft}
            >
              <div className="mr-1">
                {/* Button component */}
                <div className="flex-row flex-gap-1">
                  <MyButton
                    border={true}
                    paddingX={2}
                    paddingY={1}
                    children={"Xóa tất cả"}
                    onClick={clearFilter}
                  />
                  <div className={clsx(styles.btnApplyMobileToggle)}>
                    <MyButton
                      border={true}
                      paddingX={1}
                      paddingY={1}
                      children={"Áp dụng"}
                      onClick={filterToggle}
                    />
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
                          colorsData={colors}
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
              <div className={clsx(styles.listProduct)}>
                {isLoading ? (
                  <InfinityListSkeleton />
                ) : products.length > 0 ? (
                  <InfinityList data={products} />
                ) : (
                  <h2 className="text-center">Không tìm thấy sản phẩm nào!</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
