import { Link } from "react-router-dom";
import EmptyBodyTable from "../../../../components/EmptyBodyTable/EmptyBodyTable";
import _ from 'underscore';

const UserTable = ({ list }) => {
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
          <th>Họ</th>
          <th>Tên</th>
          <th>Email</th>
          <th>Quyền</th>
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
    return list.map((user) => {
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
              <img src={user.image} class="rounded-full" alt="" />
            </div>
          </td>
          <td data-label="LastName">{user.lastName}</td>
          <td data-label="FirstName">{user.firstName}</td>
          <td data-label="Email">{user.email}</td>
          <td data-label="Roles">{_.pluck(user.roles, 'name').join(', ')}</td>
          <td data-label="Status">
            {user.enabled ? (
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
                to={`/user/${user.id}`}
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
    return <EmptyBodyTable colSpan={8} />;
  }
};

export default UserTable