import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import DeliveryTable from "../../layouts/components/Delivery/DeliveryTable/DeliveryTable";

const Delivery = () => {
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    document.title = "Quản lý giao hàng";
  });

  const listTitle = [
    {
      title: "Giao hàng",
    },
  ];

  return (
    <div>
      <Titlebar listTitle={listTitle} />

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <DeliveryTable list={listOrder} />
            <Pagination />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Delivery