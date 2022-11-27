import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import UserTable from "../../layouts/components/User/UserTable";
import userApi from "../../services/axios/userApi";

let PageSize = 10;

const { getAllUser } = userApi;

const User = () => {
  const [listUser, setListUser] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const listTitle = [
    {
      title: "Nhân viên",
    },
  ];

  useEffect(() => {
    document.title = "Quản lý nhân viên";
  });

  const getData = async ({ params }) => {
    setIsLoading(true);
    getAllUser({ params })
      .then((resp) => {
        if (resp.totalCount) {
          setTotalCount(resp.totalCount);
        }
        return resp.data;
      })
      .then((data) => {
        console.log(data);
        setListUser(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData({ params: { page: 1, size: PageSize } });
  }, []);

  useEffect(() => {
    getData({ params: { page: currentPage, size: PageSize } });
  }, [currentPage]);

  return (
    <div>
      <Titlebar listTitle={listTitle} />
      <section className="is-hero-bar">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <Link to={"/user/new"} className="button blue">
            Thêm mới
          </Link>
        </div>
      </section>

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <UserTable list={listUser} isLoading={isLoading} />
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

export default User;
