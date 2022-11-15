import { Link } from "react-router-dom";
import EmptyBodyTable from "../../../../components/EmptyBodyTable/EmptyBodyTable";

const ProductTable = ({ list }) => {
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
          <th>Voucher</th>
          <th>Trạng thái</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <ProductTableContent list={list} />
      </tbody>
    </table>
  )
}

const ProductTableContent = ({ list }) => {
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
                <img src={product.image ? product.image : 'https://res.cloudinary.com/hauhc/image/upload/v1667836224/lizi/products/default-clothing_wy2ygo.png'} class="rounded-full" alt="" />
              </div>
            </td>
            <td data-label="Name">{product.name}</td>
            <td></td>
            <td data-label="Cost">{product.cost}</td>
            <td data-label="Price">{product.price}</td>
            <td data-label="NumberOfOrder">{product.numberOfOrder}</td>
            <td data-label="Created">{product.category.name}</td>
            <td data-label="Voucher">{}</td>
            <td data-label="Status">
              {product.enabled ? (
                <span className="icon text-green-600 text-2xl">
                  <i className="mdi mdi-check-circle"></i>
                </span>
              ) : (
                <span className="icon text-red-600 text-2xl">
                  <i className="mdi mdi-close-circle "></i>
                </span>
              )}
            </td>
            <td class="actions-cell">
              <div class="buttons right nowrap">
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
              </div>
            </td>
          </tr>
        );
      });
    } else {
      return <EmptyBodyTable colSpan={11} />;
    }
  };

export default ProductTable