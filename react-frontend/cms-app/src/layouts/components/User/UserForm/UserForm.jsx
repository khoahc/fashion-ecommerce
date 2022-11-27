import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../../components/BackButton/BackButton";
import { getRoles } from "../../../../redux/role/roleAction";
import userApi from "../../../../services/axios/userApi";
import notify from "../../../../utils/notify";

const { createUser, uploadPhotoUser, updateUser } = userApi;

const UserForm = ({ user }) => {
  const { roles } = useSelector((state) => state.role);
  const dispatch = useDispatch();
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

  const [checkedState, setCheckedState] = useState(new Array(5).fill(false));

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!roles) {
      dispatch(getRoles());
    }
  }, [roles, dispatch]);

  useEffect(() => {
    if (user) {
      console.log(user);
      setMode("update");
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setEnabled(user.enabled);
      setRoleIds(user.roles ? user.roles.map((role) => role.id) : []);

      if (user.roles) {
        console.log();
        let updatedCheckedState = [];

        for (let item of checkedState) {
          updatedCheckedState.push(item);
        }

        console.log(updatedCheckedState);
        for (let role of user.roles) {
          const position = roles.findIndex(
            (currentValue) => role.id === currentValue.id
          );
          console.log(role, updatedCheckedState);
          for (let i = 0; i< updatedCheckedState.length; i++) {
            if (i == position) {
              updatedCheckedState[i] = true;
            }
          }
        }
        console.log(updatedCheckedState);
        setCheckedState(updatedCheckedState);
      }

      if (user.photo) {
        setPreview(user.photo);
      }
    }
  }, [user]);

  // useEffect(() => {
  //   let updatedCheckedState = [];

  //   for (let item of checkedState) {
  //     updatedCheckedState.push(item);
  //   }

  //   console.log(updatedCheckedState);
  //   for (let roleId of roleIds) {
  //     const position = roles.findIndex(
  //       (currentValue) => roleId === currentValue.id
  //     );
  //     console.log(roleId, updatedCheckedState);
  //     updatedCheckedState = updatedCheckedState.map((item, index) =>
  //       index == position ? true : false
  //     );
  //   }
  //   console.log(updatedCheckedState);
  //   setCheckedState(updatedCheckedState);
  // }, [roles, roleIds, user]);

  const onSelectFile = (e) => {
    console.log("select file");
    if (!e.target.files || e.target.files.length === 0) {
      setFile(null);
      return;
    }

    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const onCheckRoleHandle = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const roleId = roles[position].id;
    if (roleIds.includes(roleId)) {
      const i = roleIds.indexOf(roleId);
      roleIds.splice(i, 1);
    } else {
      roleIds.push(roleId);
    }
    console.log(roleIds);
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
                return resp.data.id;
              }

              notify(0, "Thêm nhân viên không thành công!");
              setIsLoading(false);
            })
            .then((id) => {
              createUser({
                email,
                password,
                firstName,
                lastName,
                enabled,
                photoId: id,
                roleIds,
              }).then((resp) => {
                if (resp.status === "OK") {
                  notify(1, "Thêm nhân viên thành công!");
                  setIsLoading(false);
                  navigate("/user");
                } else {
                  notify(0, "Thêm nhân viên không thành công!");
                  setIsLoading(false);
                }
              });
            });
        } else {
          Promise.all([
            createUser({
              email,
              password,
              firstName,
              lastName,
              enabled,
              roleIds,
            }).then((resp) => {
              if (resp.status === "OK") {
                notify(1, "Thêm nhân viên thành công!");
                setIsLoading(false);
                navigate("/user");
              } else {
                notify(0, "Thêm nhân viên không thành công!");
                setIsLoading(false);
              }
            }),
          ]);
        }
        break;

      case "update":
        console.log(file);
        setIsLoading(true);

        if (file) {
          uploadPhotoUser({ photo: file })
            .then((resp) => {
              if (resp.status === "OK") {
                return resp.data.id;
              }

              notify(0, "Cập nhật thông nhân viên không thành công!");
              setIsLoading(false);
            })
            .then((id) => {
              updateUser(user.id, {
                email,
                password,
                firstName,
                lastName,
                enabled,
                photoId: id,
                roleIds,
              }).then((resp) => {
                if (resp.status === "OK") {
                  notify(1, "Cập nhật thông tin nhân viên thành công!");
                  setIsLoading(false);
                  navigate("/user");
                } else {
                  notify(0, "Cập nhật thông nhân viên không thành công!");
                  setIsLoading(false);
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
            roleIds,
          }).then((resp) => {
            if (resp.status === "OK") {
              notify(1, "Cập nhật thông tin nhân viên thành công!");
              setIsLoading(false);
              navigate("/user");
            } else {
              notify(0, "Cập nhật thông nhân viên không thành công!");
              setIsLoading(false);
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
                      required
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
                      required
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
                      required
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
                      required={mode === "create"}
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Quyền</label>
                  <div class="field-body">
                    <div class="field grouped multiline">
                      {roles.map((role, index) => (
                        <div class="control">
                          <label class="checkbox">
                            <input
                              key={role.id}
                              type="checkbox"
                              id={`role-checkbox-${index}`}
                              value={role.id}
                              checked={checkedState[index]}
                              onChange={(e) => {
                                // let v = Number(e.target.value);
                                // if (e.target.checked) {
                                //   if (!roleIds.includes(v)) {
                                //     roleIds.push(v);
                                //   }
                                // } else if (roleIds.includes(v)) {
                                //   roleIds.splice(roleIds.indexOf(v), 1);
                                // }
                                onCheckRoleHandle(index);
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
