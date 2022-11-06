import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import CategoryTable from "../../layouts/components/Category/CategoryTable";
import categoryApi from "../../services/axios/categoryApi";

const { getAllCategories } = categoryApi;

const Category = () => {
  const [listCategory, setListCategory] = useState([]);

  const listTitle = [
    {
      title: "Loại sản phẩm",
      link: "/category",
    },
  ];

  const getData = async () => {
    const resp = await getAllCategories();
    console.log(resp);
    setListCategory(resp.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    document.title = "Quản lý loại sản phẩm";
  });

  return (
    <div>
      <Titlebar listTitle={listTitle} />
      <section className="is-hero-bar">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <Link to={"/category/new"} className="button blue">
            Thêm mới
          </Link>
          {/* <button className="button blue">Thêm mới</button> */}
        </div>
      </section>

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <CategoryTable list={listCategory} />
            <Pagination />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
