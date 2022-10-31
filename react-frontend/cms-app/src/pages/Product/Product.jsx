import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import ProductTable from "../../layouts/components/Product/ProductTable";
import productApi from "../../services/axios/productApi";

const { getAllProducts } = productApi;

const Product = () => {
  const [listProduct, setListProduct] = useState([]);

  const listTitle = [
    {
      title: "Sản phẩm",
      link: "/product",
    },
  ];

  const getData = async () => {
    getAllProducts().then(resp => {
      return resp.data;
    }).then(data => {
      console.log(data);
      setListProduct(data);
    })
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    document.title = "Quản lý loại sản phẩm";
  });

  return (
    <div>
      <Titlebar listTile={listTitle} />
      <section className="is-hero-bar">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <Link to={"/product/new"} className="button blue">
            Thêm mới
          </Link>
        </div>
      </section>

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <ProductTable list={listProduct} />
            <Pagination />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Product