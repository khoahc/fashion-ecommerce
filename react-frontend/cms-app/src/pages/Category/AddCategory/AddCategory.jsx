import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Titlebar from "../../../components/Titlebar";
import CategoryForm from "../../../layouts/components/Category/CategoryForm";
import categoryApi from "../../../services/axios/categoryApi";

const { createCategory, uploadImageCategory } = categoryApi;

const AddCategory = () => {
  const navigate = useNavigate();
  const [categoryDataForm, setCategoryDataForm] = useState({
    name: "",
    parentId: null,
    enabled: false,
    imageUrl: null,
  });
  const [selectedFile, setSelectedFile] = useState(null);

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

    uploadImageCategory({ image: selectedFile })
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((response) => {
        console.log("createCategory");
        categoryDataForm.imageUrl = response.data.url;
        createCategory(categoryDataForm).then((response) => {
          console.log(response);
          if (response.status === "OK") {
            toast.success("Thêm loại sản phẩm thành công!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1900,
            });
            navigate("/category");
          } else {
            toast.error("Thêm loại sản phẩm không thành công!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }).catch(() => {
          toast.error("Thêm loại sản phẩm không thành công!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        })
        selectedFile(undefined);
      }).catch(() => {
        toast.error("Thêm loại sản phẩm không thành công!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
  };

  return (
    <div>
      <Titlebar listTile={listTitle} />

      <section className="section main-section">
        <CategoryForm
          categoryDataForm={categoryDataForm}
          setCategoryDataForm={setCategoryDataForm}
          onSubmitHandle={onSubmitHandle}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </section>
    </div>
  );
};

export default AddCategory;
