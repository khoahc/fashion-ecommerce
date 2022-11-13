import { useEffect } from "react";
import Titlebar from "../../../components/Titlebar";
import ProductForm from "../../../layouts/components/Product/ProductForm";

const AddProduct = () => {
  const listTitle = [
    {
      title: "Sản phẩm",
      link: "/product",
    },
    {
      title: "Thêm mới",
    },
  ];

  useEffect(() => {
    document.title = "Thêm sản phẩm";
  });

  return (
    <div>
      <Titlebar listTitle={listTitle} />
      
      <section className="section main-section">
        <ProductForm />
      </section>
    </div>
  );
};

export default AddProduct;
