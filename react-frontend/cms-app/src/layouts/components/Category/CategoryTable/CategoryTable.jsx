import { Link } from "react-router-dom";

const CategoryTable = (props) => {
  return (
    <div className="card has-table">
      <div className="card-content">
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
              <th>Tất cả loại sản phẩm cha</th>
              <th>Trạng thái</th>
              <th>Tạo ngày</th>
              <th>Cập nhật ngày</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <CategoryTableContent {...props} />
          </tbody>
        </table>
        <div class="table-pagination">
          <div class="flex items-center justify-between">
            <div class="buttons">
              <button type="button" class="button active">
                1
              </button>
              <button type="button" class="button">
                2
              </button>
              <button type="button" class="button">
                3
              </button>
            </div>
            <small>Page 1 of 3</small>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategoryTableContent = (props) => {
  if (props.listCategory) {
    return props.listCategory.map((category) => {
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
          <td data-label="allParentIds">{category.allParentIds}</td>
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
    return <EmptyCategoryTableContent />;
  }
};

const EmptyCategoryTableContent = () => {
  return (
    <div class="card empty">
      <div class="card-content">
        <div>
          <span class="icon large">
            <i class="mdi mdi-emoticon-sad mdi-48px"></i>
          </span>
        </div>
        <p>Nothing's here…</p>
      </div>
    </div>
  );
};

export default CategoryTable;
