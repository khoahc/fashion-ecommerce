import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Titlebar from "../../../components/Titlebar";
import CategoryForm from "../../../layouts/components/Category/CategoryForm";
import categoryApi from "../../../services/axios/categoryApi";

const { getCategoryDetails } = categoryApi;

const CategoryDetail = () => {
  const { categoryId } = useParams();

  const [category, setCategory] = useState({});

  useEffect(() => {
    const getData = async () => {
      // const resp = await getCategoryDetails(categoryId);
      // const data = resp.data;
      getCategoryDetails(categoryId).then(resp => {
        if (resp.status === 'OK') {
          return resp.data;
        }
      }).then(data => {
        setCategory(data);
      })
    };

    getData();
  }, [categoryId]);

  const listTitle = [
    {
      title: "Loại sản phẩm",
      link: "/category",
    },
    {
      title: `${category.name}`,
    },
  ];

  return (
    <div>
      <Titlebar listTitle={listTitle} />

      <section className="section main-section">
      <CategoryForm category={category} />
        
      </section>
    </div>
  );
};

export default CategoryDetail;
