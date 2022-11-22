import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import ProductTable from "../../layouts/components/Product/ProductTable";
import productApi from "../../services/axios/productApi";

const { getAllProducts } = productApi;

let PageSize = 5;

const Product = () => {
  const [listProduct, setListProduct] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const listTitle = [
    {
      title: "Sản phẩm",
    },
  ];

  const getData = async ({params}) => {
    getAllProducts({params}).then(resp => {
      if (resp.totalCount) {
        setTotalCount(resp.totalCount);
      }
      return resp.data;
    }).then(data => {
      console.log(data);
      setListProduct(data);
    })
  };

  useEffect(() => {
    getData({params: {page: 1, size: PageSize}});
  }, []);

  useEffect(() => {
    getData({params: { page: currentPage, size: PageSize}});
  }, [currentPage]);

  useEffect(() => {
    document.title = "Quản lý sản phẩm";
  });

  return (
    <div>
      <Titlebar listTitle={listTitle} />
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
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Product