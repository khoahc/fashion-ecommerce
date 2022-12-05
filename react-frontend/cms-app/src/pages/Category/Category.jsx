import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import CategoryTable from "../../layouts/components/Category/CategoryTable";
import categoryApi from "../../services/axios/categoryApi";
import notify from "../../utils/notify";

const { getAllCategories } = categoryApi;

let PageSize = 10;

const Category = () => {
  const [listCategory, setListCategory] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const listTitle = [
    {
      title: "Loại sản phẩm",
    },
  ];

  const getData = async ({ params }) => {
    setIsLoading(true);
    getAllCategories({ params })
      .then((resp) => {
        console.log(resp);
        if (resp.status === "OK") {
          setListCategory(resp.data);
          setTotalCount(resp.totalCount);
          setIsLoading(false);
        } else {
          return new Promise.reject(resp.message);
        }
      })
      .catch((error) => notify(0, error));
  };

  useEffect(() => {
    getData({ params: { page: 1, size: PageSize } });
  }, []);

  useEffect(() => {
    getData({ params: { page: currentPage, size: PageSize } });
  }, [currentPage]);

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
        </div>
      </section>

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <CategoryTable list={listCategory} isLoading={isLoading} />
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Category;
