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

  return (
    <div>
      <Titlebar listTile={listTitle} />

      <section className="section main-section">
        <CategoryForm />
      </section>
    </div>
  );
};

export default AddCategory;
