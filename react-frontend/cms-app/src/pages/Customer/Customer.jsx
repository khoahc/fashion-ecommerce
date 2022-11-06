import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import CustomerTable from "../../layouts/components/Customer/CustomerTable";

const Customer = () => {
  const [listCustomer, setListCustomer] = useState([]);

  const listTitle = [
    {
      title: "Khách hàng",
      link: "/customer",
    },
  ];

  useEffect(() => {
    document.title = "Quản lý khách hàng";
  });

  return (
    <div>
      <Titlebar listTitle={listTitle} />

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <CustomerTable list={listCustomer} />
            <Pagination />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Customer