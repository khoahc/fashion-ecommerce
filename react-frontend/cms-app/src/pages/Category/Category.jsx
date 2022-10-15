import { useEffect } from "react";
import { Link } from "react-router-dom";
import Titlebar from "../../components/Titlebar";
import Notification from "../../components/Notification"
import CategoryTable from "../../layouts/components/Category/CategoryTable";

const listCategory = [
    {
      id: 123, 
      name: "Nam",
      parent: "",
      createTime: "Oct 25, 2021",
      updateTime: "Oct 25, 2021"
    }
  ]

const Category = () => {
    const listTitle = [{
        title: 'Loại sản phẩm',
        link: '/category',
      }];
    
      useEffect(() => {
        document.title = 'Quản lý loại sản phẩm';
      });

    return (
        <div>
          <Titlebar listTile={listTitle} />
          <section className="is-hero-bar">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <Link to={"/category/new"} className="button blue" >
                Thêm mới
              </Link>
              {/* <button className="button blue">Thêm mới</button> */}
            </div>
          </section>
    
          <section className="section main-section">
    
            <Notification result="success" message="them thanh cong" />
    
            <CategoryTable listCategory={listCategory} />
      
          </section>
        </div>
      );
}

export default Category