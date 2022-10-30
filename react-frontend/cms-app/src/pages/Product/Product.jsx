import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import ProductTable from "../../layouts/components/Product/ProductTable";

const Product = () => {
  const [listProduct, setListProduct] = useState([]);

  const listTitle = [
    {
      title: "Sản phẩm",
      link: "/product",
    },
  ];
  return (
    <div>
      <Titlebar listTile={listTitle} />
      <section className="is-hero-bar">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <Link to={"/product/new"} className="button blue">
            Thêm mới
          </Link>
          {/* <button className="button blue">Thêm mới</button> */}
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