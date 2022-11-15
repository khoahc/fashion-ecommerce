import { useEffect } from "react";
import Titlebar from "../../components/Titlebar";

const Statis = () => {
  const listTitle = [
    {
      title: "Thống kê",
      link: "/statis",
    },
  ];

  useEffect(() => {
    document.title = "Quản lý thống kê";
  });

  return (
    <div>
      <Titlebar listTitle={listTitle} />

      <section className="section main-section">
        <div className="card has-table">
          <div className="card-content">
            statis
          </div>
        </div>
      </section>
    </div>
  )
}

export default Statis