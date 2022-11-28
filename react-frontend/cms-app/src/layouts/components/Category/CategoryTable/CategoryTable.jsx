import { useState } from "react";
import { Link } from "react-router-dom";
import EmptyBodyTable from "../../../../components/EmptyBodyTable/EmptyBodyTable";
import LoadingTableContent from "../../../../components/LoadingTableContent/LoadingTableContent";
import ModalDeleteCategory from "../ModalDeleteCategory";

const CategoryTable = ({ list, isLoading }) => {
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
          <th>Tên</th>
          <th>Tất cả loại sản phẩm cha</th>
          <th className="text-center">Trạng thái</th>
          {/* <th>Tạo ngày</th> */}
          {/* <th>Cập nhật ngày</th> */}
          <th className="text-center">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <LoadingTableContent colSpan={11} />
        ) : (
          <CategoryTableContent list={list} />
        )}
      </tbody>
    </table>
  );
};

const CategoryTableContent = ({ list }) => {
  const [categoryIdChoose, setCategoryIdChoose] = useState(null);
  const [showModalDeleteCategory, setShowModalDeleteCategory] = useState(false);
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
          <td data-label="Name">{category.name}</td>
          <td data-label="allParentIds">{category.allParentNames}</td>
          <td data-label="Status">
            <div className="flex items-center justify-center">
              {category.enabled ? (
                <span className="icon text-green-600 text-2xl">
                  <i className="mdi mdi-check-circle"></i>
                </span>
              ) : (
                <span className="icon text-red-600 text-2xl">
                  <i className="mdi mdi-close-circle "></i>
                </span>
              )}
            </div>
          </td>
          {/* <td data-label="Created">
            <small class="text-gray-500" title={category.createTime}>
              {category.createTime}
            </small>
          </td> */}
          {/* <td data-label="Created">
            <small class="text-gray-500" title={category.updateTime}>
              {category.updateTime}
            </small>
          </td> */}
          <td class="actions-cell">
            <div class="buttons justify-center nowrap">
              <Link
                to={`/category/${category.id}`}
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
                onClick={() => {
                  setShowModalDeleteCategory(true);
                  setCategoryIdChoose(category.id);
                }}
              >
                <span class="icon">
                  <i class="mdi mdi-trash-can"></i>
                </span>
              </button>
              {
                categoryIdChoose != null && (
                  <>
                  {showModalDeleteCategory && (
                    <ModalDeleteCategory
                      categoryId={categoryIdChoose}
                      showModalDeleteCategory={showModalDeleteCategory}
                      setShowModalDeleteCategory={setShowModalDeleteCategory}
                     />
                  )}
                  </>
                )
              }
            </div>
          </td>
        </tr>
      );
    });
  } else {
    return <EmptyBodyTable colSpan={8} />;
  }
};

export default CategoryTable;
