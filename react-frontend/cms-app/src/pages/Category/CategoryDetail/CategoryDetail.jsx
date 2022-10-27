import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Titlebar from "../../../components/Titlebar";
import CategoryForm from "../../../layouts/components/Category/CategoryForm";
import categoryApi from "../../../services/axios/categoryApi";

const { getCategoryDetails, updateCategory } = categoryApi;

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const [categoryDataForm, setCategoryDataForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const resp = await getCategoryDetails(categoryId);
      const data = resp.data;
      setCategoryDataForm({
        name: data.name,
        parentId: data.parent ? data.parent.id : null,
        enabled: data.enabled,
      });
    };

    getData();
  }, [categoryId]);

  const listTitle = [
    {
      title: "Loại sản phẩm",
      link: "/category",
    },
    {
      title: `${categoryDataForm.name}`,
      link: `/category/${categoryId}`,
    },
  ];

  const onSubmitHandle = (e) => {
    e.preventDefault();
    console.log(categoryDataForm);
    updateCategory(categoryId, categoryDataForm).then((response) => {
      console.log(response);
      if (response.status === 'OK') {
        toast.success("Cập nhật thông tin thành công!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1900,
        });
        navigate('/category');
      } else {
        toast.error("Cập nhật thông tin không thành công!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    });
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

export default CategoryDetail;
