import { Link } from "react-router-dom";
import EmptyBodyTable from "../../../../components/EmptyBodyTable/EmptyBodyTable";

const OrderTable = ({ list }) => {
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
          <th>Người mua</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ</th>
          <th>Tổng tiền</th>
          <th>Thời gian đặt</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <OrderTableContent list={list} />
      </tbody>
    </table>
  )
}

const OrderTableContent = ({ list }) => {
    if (list && list.length !== 0) {
      return list.map((category) => {
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
                <img src={category.image} class="rounded-full" alt="" />
              </div>
            </td>
            <td data-label="Name">{category.name}</td>
            <td data-label="allParentIds">{category.allParentNames}</td>
            <td data-label="Status">
              {category.enabled ? (
                <span className="icon text-green-600 text-2xl">
                  <i className="mdi mdi-check-circle"></i>
                </span>
              ) : (
                <span className="icon text-red-600 text-2xl">
                  <i className="mdi mdi-close-circle "></i>
                </span>
              )}
            </td>
            <td data-label="Created">
              <small class="text-gray-500" title={category.createTime}>
                {category.createTime}
              </small>
            </td>
            <td data-label="Created">
              <small class="text-gray-500" title={category.updateTime}>
                {category.updateTime}
              </small>
            </td>
            <td class="actions-cell">
              <div class="buttons right nowrap">
                <Link
                  to={`/category/${category.id}`}
                  class="button small green --jb-modal"
                >
                  <span class="icon" title="Duyệt đơn hàng">
                    <i class="mdi mdi-text-box-check"></i>
                  </span>
                </Link>
                <button
                  class="button small red --jb-modal"
                  data-target="sample-modal"
                  type="button"
                >
                  <span class="icon" title="Hủy đơn hàng">
                    <i class="mdi mdi-text-box-remove"></i>
                  </span>
                </button>
              </div>
            </td>
          </tr>
        );
      });
    } else {
      return <EmptyBodyTable colSpan={8} />;
    }
  };

export default OrderTable