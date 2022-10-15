
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
                  <th>Loại sản phẩm cha</th>
                  <th>Các loại sản phẩm con</th>
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
}

const CategoryTableContent = (props) => {
    if (props.listCategory) {
        return props.listCategory.map(category => {
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
                        "https://avatars.dicebear.com/v2/initials/rebecca-bauch.svg"
                      }
                      class="rounded-full"
                      alt=""
                    />
                  </div>
                </td>
                <td data-label="Name">{category.name}</td>
                <td data-label="Parent">{category.parent}</td>
                <td data-label="parents">{category.parent}</td>
                <td data-label="Progress" class="progress-cell">
                  <progress max="100" value="79">
                    79
                  </progress>
                </td>
                <td data-label="Created">
                  <small class="text-gray-500" title="Oct 25, 2021">
                    {category.createTime}
                  </small>
                </td>
                <td data-label="Created">
                  <small class="text-gray-500" title="Oct 25, 2021">
                    {category.updateTime}
                  </small>
                </td>
                <td class="actions-cell">
                  <div class="buttons right nowrap">
                    <button
                      class="button small green --jb-modal"
                      data-target="sample-modal-2"
                      type="button"
                    >
                      <span class="icon">
                        <i class="mdi mdi-eye"></i>
                      </span>
                    </button>
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
            )
        })
    } else {
        return(
            <EmptyCategoryTableContent />
        )
    }
}

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

export default CategoryTable