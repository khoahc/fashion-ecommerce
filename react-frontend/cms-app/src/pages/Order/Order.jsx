import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import OrderTable from "../../layouts/components/Order/OrderTable";
import { getAllOrder } from "../../services/axios/orderApi";

let PageSize = 10;

const Order = () => {
  const [listOrder, setListOrder] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const listTitle = [
    {
      title: "Đơn hàng",
    },
  ];

  const getData = async ({params}) => {
    setIsLoading(true);
    getAllOrder({params})
      .then((res) => {
        if (res.totalCount) {
          setTotalCount(res.totalCount);
        }
        return res.data;
      })
      .then((data) => {
        console.log(data);
        setListOrder(data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData({params: {page: 1, size: PageSize}});
  }, []);

  useEffect(() => {
    getData({params: { page: currentPage, size: PageSize}});
  }, [currentPage]);

  useEffect(() => {
    document.title = "Quản lý đơn hàng";
  });

  return (
    <div>
      <Titlebar listTitle={listTitle} />

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <OrderTable list={listOrder} isLoading={isLoading} />
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

export default Order;
