import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import OrderTable from "../../layouts/components/Order/OrderTable";
import { getAllOrder } from "../../services/axios/orderApi";

const Order = () => {
  const [listOrder, setListOrder] = useState([]);

  const listTitle = [
    {
      title: "Đơn hàng",
    },
  ];

  const getData = async () => {
    getAllOrder()
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data);
        setListOrder(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    document.title = "Quản lý đơn hàng";
  });

  return (
    <div>
      <Titlebar listTitle={listTitle} />

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <OrderTable list={listOrder} />
            <Pagination />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;
