import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import Select from "react-select";
import clsx from "clsx";

import styles from "./Catalog.module.scss";
import numberWithCommas from "../../utils/numberWithCommas";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import CheckBox from "../../components/Checkbox";
import InfinityList from "../../components/InfinityList";
import catalogCategory from "../../assets/fake-data/catalogCategory";

const Catalog = () => {
  const { pathname } = useLocation();
  const slug = pathname.slice(3);

  const optionsSort = [
    { value: "priceHighToLow", label: "Giá thấp đến cao" },
    { value: "priceLowToHigh", label: "Giá cao đến thấp" },
    { value: "topSellers", label: "Bán chạy" },
    { value: "newest", label: "Mới nhất" },
  ];
  const MAX_PRICE = 99999999999;
  const filterPrice = [
    { start: 0, end: 50000 },
    { start: 50000, end: 100000 },
    { start: 100000, end: 150000 },
    { start: 150000, end: 200000 },
    { start: 200000, end: 300000 },
    { start: 300000, end: 500000 },
    { start: 500000, end: MAX_PRICE },
  ];

  const [selectedOption, setSelectedOption] = useState(null);

  console.log(selectedOption);
  // -----------------------------------------------------
  const initFilter = {
    category: [],
    color: [],
    price: [],
  }; 

  const productList = catalogCategory.products;

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
  //---------------------------------------------------------------------

  const [filter, setFilter] = useState(initFilter);

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

  const clearFilter = () => setFilter(initFilter);
  const clearMenuFilter = () => setFilter(initMenuFilter);
  const clearColorFilter = () => setFilter(initColorFilter);
  const clearPriceFilter = () => setFilter(initPriceFilter);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.slug],
          });
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
          const newCategory = filter.category.filter(
            (e) => e !== item.categorySlug
          );
          setFilter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item.color);
          setFilter({ ...filter, color: newColor });
          break;
        case "PRICE":
          const newPrice = filter.price.filter((e) => e !== item);
          setFilter({ ...filter, price: newPrice });
          break;
        default:
      }
    }
  };

  //filter
  const updateProducts = useCallback(() => {
    let temp = productList;

    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.categorySlug));
    }

    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) =>
          filter.color.includes(color.slug)
        );
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

    setProducts(temp);
  }, [filter, productList]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  // menu
  const menuData = catalogCategory.menu;
  const menu = menuData.map((item, index) => (
    <div key={index}>
      {/* <Link to={"/c/" + item.slug}>
        <ul>{item.name}</ul>
      </Link> */}
      <CheckBox
        label={item.name}
        onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
        checked={filter.category.includes(item.slug)}
      />

      {item.hasOwnProperty("children") &&
        item.children.map((item, index) => (
          <CheckBox
            key={index}
            label={item.name}
            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
            checked={filter.category.includes(item.slug)}
          />
        ))}
    </div>
  ));

  //colors
  const colors = catalogCategory.colors.map((item, index) => (
    <div key={index} className="">
      <CheckBox
        label={item.name}
        onChange={(input) => filterSelect("COLOR", input.checked, item)}
        checked={filter.color.includes(item.slug)}
      />
    </div>
  ));

  //price
  const prices = filterPrice.map((item, index) => (
    <div key={index} className="">
      <CheckBox
        label={
          numberWithCommas(item.start) + ' đ' + " - " + (item.end < MAX_PRICE ? numberWithCommas(item.end) + ' đ' : "Vô hạn")
        }
        onChange={(input) => filterSelect("PRICE", input.checked, item)}
        checked={filter.price.some((elem) => {
          return JSON.stringify(item) === JSON.stringify(elem);
        })}
      />
    </div>
  ));

  return (
    <>
      <img
        className={clsx(styles.banner)}
        src={catalogCategory.image}
        alt="image-category"
      />

      <div className={clsx(styles.container)}>
        <Breadcrumb name={catalogCategory.name} />

        <div
          className={clsx(styles.nav, "py-1", {
            [styles.up]: scrollDirection === "down",
            [styles.down]: scrollDirection === "up",
          })}
        >
          <div>
            <h2 className={clsx(styles.titleCategory)}>
              Đồ {catalogCategory.name}
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
                  onClick={clearFilter}
                />

                <div className={clsx(styles.menu)}>
                  <div className={clsx(styles.title)}>
                    <h4>Danh mục</h4>
                    <IconContext.Provider value={{ color: "#444" }}>
                      <div>
                        <FaTrashAlt onClick={clearMenuFilter}/>
                      </div>
                    </IconContext.Provider>
                  </div>
                  {/* list menu */}
                  <div className="mt-1">{menu}</div>
                </div>

                {/* filter */}
                <div className={clsx(styles.filter)}>
                  <div className={clsx(styles.colorList)}>
                    <div className={clsx(styles.title)}>
                      <h4>Màu sắc</h4>
                      <IconContext.Provider value={{ color: "#444" }}>
                        <div>
                          <FaTrashAlt onClick={clearColorFilter}/>
                        </div>
                      </IconContext.Provider>
                    </div>
                    {/* list color */}
                    <div className="mt-1">{colors}</div>
                  </div>
                  <div className={clsx(styles.priceList)}>
                    <div className={clsx(styles.title)}>
                      <h4>Giá</h4>
                      <IconContext.Provider value={{ color: "#444" }}>
                        <div>
                          <FaTrashAlt onClick={clearPriceFilter}/>
                        </div>
                      </IconContext.Provider>
                    </div>
                    {/* list price */}
                    <div className="mt-1 mb-2">{prices}</div>
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
