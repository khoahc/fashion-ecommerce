import React from "react";
import { useLocation } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import clsx from "clsx";

import Breadcrumb from "../../components/Breadcrumb";
import styles from "./Catalog.module.scss";
import { getCategoryBySlug } from "../../assets/fake-data/category";

const Catalog = () => {
  const { pathname } = useLocation();
  const slug = pathname.slice(3);
  const category = getCategoryBySlug(slug);
  console.log(JSON.stringify(category));
  return (
    <>
      <img src={category.image} alt="image-category" />
      <Breadcrumb name={category.name} />
      <h3 className="title">Đồ {category.name}</h3>
      <hr />
      <div className={clsx(styles.content)}>
        <div className={clsx(styles.left)}>
          {/* Button component */}
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
          </div>
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
        <div className={clsx(styles.right)}>
          <div className={clsx(styles.sort)}></div>
          <div className={clsx(styles.listProduct)}></div>
        </div>
      </div>
    </>
  );
};

export default Catalog;
