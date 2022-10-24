import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Titlebar from "../../../components/Titlebar";
import CategoryForm from "../../../layouts/components/Category/CategoryForm";
import categoryApi from "../../../services/axios/categoryApi";

const { getCategoryDetails } = categoryApi;

const CategoryDetail = (props) => {
  const { categoryId } = useParams();

  const [category, setCategory] = useState({});

  const getData = async () => {
    const resp = await getCategoryDetails(categoryId);
    console.log(resp);
    setCategory(resp.data);
  }
  
  useEffect(() => {
    getData();
  }, []);

  const listTitle = [
    {
      title: "Loại sản phẩm",
      link: "/category",
    },
    {
      title: `${category.name}`,
      link: `/category/${categoryId}`,
    },
  ];

  return (
    <div>
      <Titlebar listTile={listTitle} />

      <section className="section main-section">
        <CategoryForm category={category} />
      </section>
    </div>
  );
};

export default CategoryDetail;
