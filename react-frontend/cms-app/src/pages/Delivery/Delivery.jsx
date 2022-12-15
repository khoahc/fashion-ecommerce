import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import DeliveryTable from "../../layouts/components/Delivery/DeliveryTable/DeliveryTable";
import { getAllOrderToDeliver } from "../../services/axios/deliveryAPI";

let PageSize = 10;

const Delivery = () => {
  const [listOrder, setListOrder] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const listTitle = [
    {
      title: "Giao hàng",
    },
  ];

  useEffect(() => {
    document.title = "Quản lý giao hàng";
  });

  const getData = async ({ params }) => {
    setIsLoading(true);
    getAllOrderToDeliver({ params }).then((resp) => {
      if (resp.status === "OK") {
        if (resp.totalCount) {
          setTotalCount(resp.totalCount);
        }
        setListOrder(resp.data);
        setIsLoading(false);
      }
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

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <DeliveryTable
              list={listOrder}
              isLoading={isLoading}
              pageSize={PageSize}
              currentPage={currentPage}
            />
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

export default Delivery;
