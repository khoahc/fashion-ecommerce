import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import Titlebar from "../../components/Titlebar";
import VoucherTable from "../../layouts/components/Voucher/VoucherTable/VoucherTable";

const Voucher = () => {
  const [listVoucher, setListVoucher] = useState([]);

  const listTitle = [
    {
      title: "Voucher",
      link: "/voucher",
    },
  ];

  useEffect(() => {
    document.title = "Quản lý voucher";
  });

  return (
    <div>
      <Titlebar listTitle={listTitle} />
      <section className="is-hero-bar">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <Link to={"/voucher/new"} className="button blue">
            Thêm mới
          </Link>
        </div>
      </section>

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            <VoucherTable list={listVoucher} />
            <Pagination />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Voucher