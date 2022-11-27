import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../../../../components/BackButton/BackButton";
import roleApi from "../../../../services/axios/roleApi";
import userApi from "../../../../services/axios/userApi";

const { getAllRole } = roleApi;
const { createUser, uploadPhotoUser, updateUser } = userApi;

const UserForm = ({ user }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("create");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [roleIds, setRoleIds] = useState([]);
  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState(
    "https://res.cloudinary.com/hauhc/image/upload/v1667738857/lizi/users/default_najhrt.webp"
  );

  const [listRole, setListRole] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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
      setRoleIds(user.roles ? user.roles.map((role) => role.id) : []);
      setEnabled(user.enabled);
      if (user.photo) {
        setPreview(user.photo);
      }
    }
  }, [user]);

  const onSelectFile = (e) => {
    console.log("select file");
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      return;
    }

    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const onSubmitHandle = (e) => {
    e.preventDefault();

    switch (mode) {
      case "create":
        setIsLoading(true);
        if (file) {
          uploadPhotoUser({
            photo: file,
          })
            .then((resp) => {
              if (resp.status === "OK") {
                return resp.data;
              } else {
                toast.error("Thêm nhân viên không thành công!", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1900,
                });
              }
              console.log(resp);
            })
            .then((data) => {
              createUser({
                email,
                password,
                firstName,
                lastName,
                enabled,
                photoId: data.id,
                roleIds,
              }).then((resp) => {
                if (resp.status === "OK") {
                  toast.success("Thêm nhân viên thành công!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1900,
                  });
                  navigate("/user");
                } else {
                  toast.error("Thêm nhân viên không thành công!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1900,
                  });
                }
              });
            });
        } else {
          createUser({
            email,
            password,
            firstName,
            lastName,
            enabled,
            photoId: null,
            roleIds,
          }).then((resp) => {
            if (resp.status === "OK") {
              toast.success("Thêm nhân viên thành công!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1900,
              });
              navigate("/user");
            } else {
              toast.error("Thêm nhân viên không thành công!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1900,
              });
            }
          });
        }
        break;

      case "update":
        console.log(file);
        if (file) {
          uploadPhotoUser({
            photo: file,
          })
            .then((resp) => {
              if (resp.status === "OK") {
                return resp.data;
              } else {
                toast.error("Thêm nhân viên không thành công!", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1900,
                });
              }
              console.log(resp);
            })
            .then((data) => {
              updateUser(user.id, {
                email,
                password,
                firstName,
                lastName,
                enabled,
                photoId: data.id,
                roleIds,
              }).then((resp) => {
                if (resp.status === "OK") {
                  toast.success("Cập nhật thông tin nhân viên thành công!", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 1900,
                  });
                  navigate("/user");
                } else {
                  toast.error(
                    "Cập nhật thông tin nhân viên không thành công!",
                    {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 1900,
                    }
                  );
                }
              });
            });
        } else {
          updateUser(user.id, {
            email,
            password,
            firstName,
            lastName,
            enabled,
            photoId: null,
            roleIds,
          }).then((resp) => {
            if (resp.status === "OK") {
              toast.success("Cập nhật thông tin nhân viên thành công!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1900,
              });
              navigate("/user");
            } else {
              toast.error("Cập nhật thông tin nhân viên không thành công!", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 1900,
              });
            }
          });
        }
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
                <div class="image w-48 h-48 mx-auto mb-4">
                  <img
                    src={preview}
                    alt=""
                    class="rounded-full border-2 border-gray-400 object-cover"
                  />
                </div>
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
                <div class="field">
                  <div class="field-body">
                    <div class="field file">
                      <label class="upload control">
                        <span class="button blue">Tải ảnh</span>
                        <input type="file" onChange={onSelectFile} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="field grouped mt-10">
              <div className="control">
                <LoadingButton
                  className="button green"
                  type="submit"
                  sx={{
                    height: "100%",
                    fontSize: "100%",
                    textTransform: "none",
                  }}
                  loading={isLoading}
                  variant="contained"
                >
                  Lưu
                </LoadingButton>
                {/* <button type="submit" className="button green">Lưu</button> */}
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
