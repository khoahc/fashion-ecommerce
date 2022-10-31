import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Titlebar from "../../../components/Titlebar";
import ProductForm from "../../../layouts/components/Product/ProductForm";
import productApi from "../../../services/axios/productApi";

const { getProductDetails } = productApi
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductDetails(productId).then(resp => {
      if (resp.status === 'OK') {
        return resp.data;
      } else {

      }
    }).then(data => {
      setProduct(data);
    });
  }, [productId]);

  const listTitle = [
    {
      title: "Sản phẩm",
      link: "/product",
    },
    {
      title: `${product.name}`,
      link: `/product/${product.id}`,
    },
  ];

  return (
    <div>
      <Titlebar listTile={listTitle} />

      <section className="section main-section">
        <ProductForm product={product} />
      </section>
    </div>
  );
};

export default ProductDetail;
