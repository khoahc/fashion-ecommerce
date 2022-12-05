import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyBodyTable from "../../../../components/EmptyBodyTable/EmptyBodyTable";
import LoadingTableContent from "../../../../components/LoadingTableContent/LoadingTableContent";
import ModalDisabledProduct from "../ModalDisabledProduct/ModalDisabledProduct";
import ModalEnabledProduct from "../ModalEnabledProduct/ModalEnabledProduct";
import ModalProductDetail from "../ModalProductDetail/ModalProductDetail";

const ProductTable = ({ list, isLoading }) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="checkbox-cell">
            <label className="checkbox">
              <input type="checkbox"></input>
              <span className="check"></span>
            </label>
          </th>
          <th className="image-cell"></th>
          <th>Tên</th>
          <th>Tùy chọn</th>
          <th>Chi phí</th>
          <th>Giá bán</th>
          <th>Số lượng đã bán</th>
          <th>Loại sản phẩm</th>
          {/* <th>Voucher</th> */}
          <th className="text-center">Trạng thái</th>
          <th className="text-center">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <LoadingTableContent colSpan={11} />
        ) : (
          <ProductTableContent list={list} />
        )}
      </tbody>
    </table>
  );
};

const ProductTableContent = ({ list }) => {
  const [productIdChoose, setProductIdChoose] = useState(null);
  const [showModalDetails, setShowModalDetails] = useState(false);
  const [showModalEnabled, setShowModalEnabled] = useState(false);
  const [showModalDiabled, setShowModalDisabled] = useState(false);
  if (list && list.length !== 0) {
    return list.map((product) => {
      return (
        <tr>
          <td className="checkbox-cell">
            <label className="checkbox">
              <input type="checkbox"></input>
              <span className="check"></span>
            </label>
          </td>
          <td className="image-cell">
            <div className="image">
              <img
                src={
                  product.mainImage
                    ? product.mainImage
                    : "https://res.cloudinary.com/hauhc/image/upload/v1667836224/lizi/products/default-clothing_wy2ygo.png"
                }
                className="rounded-full"
                alt=""
              />
            </div>
          </td>
          <td data-label="Name">{product.name}</td>
          <td></td>
          <td data-label="Cost">{product.cost}</td>
          <td data-label="Price">{product.price}</td>
          <td data-label="NumberOfOrder">{product.numberOfOrder}</td>
          <td data-label="Created">{product.category.name}</td>
          {/* <td data-label="Voucher">{}</td> */}
          <td data-label="Status">
            <div className="flex items-center justify-center">
              {product.enabled ? (
                <button
                  className="--jb-modal"
                  onClick={() => {
                    setShowModalDisabled(true);
                    setProductIdChoose(product.id);
                  }}
                >
                  <span className="icon text-green-600 text-2xl hover:text-green-800">
                    <i className="mdi mdi-check-circle"></i>
                  </span>
                </button>
              ) : (
                <button
                  className="--jb-modal"
                  onClick={() => {
                    setShowModalEnabled(true);
                    setProductIdChoose(product.id);
                  }}
                >
                  <span className="icon text-red-600 text-2xl hover:text-red-800">
                    <i className="mdi mdi-close-circle "></i>
                  </span>
                </button>
              )}
            </div>
          </td>
          <td className="actions-cell">
            <div className="buttons justify-center nowrap">
              {/* <button
                class="button small red --jb-modal"
                data-target="sample-modal"
                type="button"
                onClick={() => {
                  setShowModalDetails(true);
                  setProductIdChoose(product.id);
                }}
              >
                <span class="icon">
                  <i class="mdi mdi-eye"></i>
                </span>
              </button> */}
              <Link
                to={`/product/${product.id}`}
                class="button small green --jb-modal"
              >
                <span class="icon">
                  <i class="mdi mdi-eye"></i>
                </span>
              </Link>
              <button
                class="button small red --jb-modal"
                data-target="sample-modal"
                type="button"
              >
                <span class="icon">
                  <i class="mdi mdi-trash-can"></i>
                </span>
              </button>
              {productIdChoose != null && (
                <>
                  {showModalDetails && (
                    <ModalProductDetail
                      id={productIdChoose}
                      showModal={showModalDetails}
                      setShowModal={setShowModalDetails}
                    />
                  )}
                  {showModalDiabled && (
                    <ModalDisabledProduct
                      id={productIdChoose}
                      showModal={showModalDiabled}
                      setShowModal={setShowModalDisabled}
                    />
                  )}
                  {showModalEnabled && (
                    <ModalEnabledProduct
                      id={productIdChoose}
                      showModal={showModalEnabled}
                      setShowModal={setShowModalEnabled}
                    />
                  )}
                </>
              )}
            </div>
          </td>
        </tr>
      );
    });
  } else {
    return <EmptyBodyTable colSpan={11} />;
  }
};

export default ProductTable;
