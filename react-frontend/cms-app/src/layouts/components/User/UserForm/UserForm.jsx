import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../../../../components/BackButton/BackButton";
import roleApi from "../../../../services/axios/roleApi";
import userApi from "../../../../services/axios/userApi";

const { getAllRole } = roleApi;
const { createUser } = userApi;

const UserForm = ({ user }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("create");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [photoId, setPhotoId] = useState(null);
  const [roleIds, setRoleIds] = useState([]);

  const [listRole, setListRole] = useState([]);

  const getData = async () => {
    getAllRole()
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        setListRole(data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      setMode("update");
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setRoleIds(user.roles ? user.roles.map(role => role.id) : []);
      setEnabled(user.enabled);
    }
  }, [user]);

  const onSubmitHandle = (e) => {
    e.preventDefault();

    switch (mode) {
      case "create":
        setPhotoId(4);
        createUser({
          email,
          password,
          firstName,
          lastName,
          enabled,
          photoId,
          roleIds,
        }).then((resp) => {
          if (resp.status === "OK") {
            toast.success("Thêm nhân viên thành công!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1900,
            });
            navigate("/user");
          } else {
            toast.success("Thêm nhân viên không thành công!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1900,
            });
          }
        });
        break;

      case "update":
        break;

      default:
        break;
    }
  };

  return (
    <section className="section main-section">
      <div className="card mb-6">
        <div className="card-content">
          <form onSubmit={onSubmitHandle}>
            <div className="field">
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Họ"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Tên"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Quyền</label>
                  <div class="field-body">
                    <div class="field grouped multiline">
                      {listRole.map((role) => (
                        <div class="control">
                          <label class="checkbox">
                            <input
                              type="checkbox"
                              value={role.id}
                              checked={user && roleIds.includes(role.id)}
                              onChange={(e) => {
                                let v = e.target.value;
                                if (e.target.checked) {
                                  if (!roleIds.includes(v)) {
                                    roleIds.push(v);
                                  }
                                } else if (roleIds.includes(v)) {
                                  roleIds.splice(roleIds.indexOf(v), 1);
                                }
                                console.log(roleIds);
                              }}
                            />
                            <span class="check"></span>
                            <span class="control-label">{role.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-body">
                    <div className="field">
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onClick={(e) => {
                            setEnabled(e.target.checked);
                          }}
                        />
                        <span className="check"></span>
                        <span className="control-label">Trạng thái</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="field grouped mt-10">
              <div className="control">
                <button type="submit" className="button green">
                  Lưu
                </button>
              </div>
              <div className="control">
                <BackButton text={"Hủy"} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserForm;
