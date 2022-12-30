import LoadingTableContent from "../../../../components/LoadingTableContent/LoadingTableContent";
import OrderTableContent from "../../../../components/OrderTableContent";

const OrderTable = ({ list, isLoading, pageSize, currentPage, reloadData }) => {
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
          <th>STT</th>
          <th>Người mua</th>
          <th>Số điện thoại</th>
          <th>Thời gian đặt</th>
          <th>Tổng tiền</th>
          <th className="text-center">Trạng thái</th>
          <th className="text-center">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <LoadingTableContent colSpan={11} />
        ) : (
          <OrderTableContent
            listOrder={list}
            pageSize={pageSize}
            currentPage={currentPage}
            reloadData={reloadData}
          />
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
