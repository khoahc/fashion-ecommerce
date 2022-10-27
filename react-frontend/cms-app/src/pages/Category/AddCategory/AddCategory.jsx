import { useEffect, useState } from "react";
import Titlebar from "../../../components/Titlebar";
import CategoryForm from "../../../layouts/components/Category/CategoryForm";
import categoryApi from "../../../services/axios/categoryApi";

const { createCategory } = categoryApi;

const AddCategory = () => {
  const [categoryDataForm, setCategoryDataForm] = useState({
    name: "",
    parentId: null,
    enabled: false,
  });

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

  const onSubmitHandle = (e) => {
    e.preventDefault();
    console.log(categoryDataForm);
    createCategory(categoryDataForm);
  };

  return (
    <div>
      <Titlebar listTile={listTitle} />

      <section className="section main-section">
        <CategoryForm
          categoryDataForm={categoryDataForm}
          setCategoryDataForm={setCategoryDataForm}
          onSubmitHandle={onSubmitHandle}
        />
      </section>
    </div>
  );
};

export default AddCategory;
