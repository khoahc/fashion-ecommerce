import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Titlebar from "../../../components/Titlebar";
import ProductFormDetail from "../../../layouts/components/Product/ProductFormDetail/ProductFormDetail";
import { getProductInfo } from "../../../redux/product/productForm/productFormAction";

const ProductDetail = () => {
  const { form } = useSelector((state) => state.productForm);
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    dispatch(getProductInfo({id: productId}));
  }, [dispatch, productId]);

  useEffect(() => {
    document.title = `${form.name}`;
  });

  const listTitle = [
    {
      title: "Sản phẩm",
      link: "/product",
    },
    {
      title: `${form.name}`,
    },
  ];

  return (
    <div>
      <Titlebar listTitle={listTitle} />

      <section className="section main-section">
        <ProductFormDetail />
      </section>
    </div>
  );
};

export default ProductDetail;
