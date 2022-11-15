import { useEffect } from "react";
import Titlebar from "../../../components/Titlebar";
import CategoryForm from "../../../layouts/components/Category/CategoryForm";

const AddCategory = () => {

  const listTitle = [
    {
      title: "Loại sản phẩm",
      link: "/category",
    },
    {
      title: "Thêm mới",
      link: "/category/new",
    },
  ];

  useEffect(() => {
    document.title = "Thêm loại sản phẩm";
  });

  return (
    <div>
      <Titlebar listTitle={listTitle} />

      <section className="section main-section">
        <CategoryForm />
      </section>
    </div>
  );
};

export default AddCategory;
