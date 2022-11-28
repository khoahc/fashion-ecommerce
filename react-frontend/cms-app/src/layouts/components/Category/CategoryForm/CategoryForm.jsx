import { useEffect, useState } from "react";
import categoryApi from "../../../../services/axios/categoryApi";
import BackButton from "../../../../components/BackButton/BackButton";
import { useNavigate } from "react-router-dom";
import notify from "../../../../utils/notify";
import { LoadingButton } from "@mui/lab";

const {
  getAllLevel1And2Categories,
  createCategory,
  updateCategory,
  uploadImageCategory,
} = categoryApi;

const CategoryFrom = ({ category }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("create");

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const [file, setFile] = useState(null);

  // const [preview, setPreview] = useState(
  //   "https://res.cloudinary.com/hauhc/image/upload/v1667777483/lizi/categories/default-image_v2azdj.jpg"
  // );
  const [preview, setPreview] = useState(null);

  const [listCategory, setListCategory] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const resp = await getAllLevel1And2Categories();
    setListCategory(resp.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (category) {
      console.log(category);
      setMode("update");
      setName(category.name);
      setPreview(category.image);
      setEnabled(category.enabled);
      setParentId(category.parent ? category.parent.id : null);
    }
  }, [category]);

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
    setIsLoading(true);

    switch (mode) {
      case "create":
        if (file) {
          uploadImageCategory({ image: file })
            .then((resp) => {
              if (resp.status === "OK") {
                return resp.data;
              }
              return Promise.reject(new Error(resp.message));
            })
            .then((data) => {
              createCategory({
                name,
                parentId,
                enabled,
                imageUrl: data.url,
              })
                .then((resp) => {
                  if (resp.status === "OK") {
                    notify(1, "Thêm loại sản phẩm thành công!");
                    navigate("/category");
                  } else {
                    notify(0, "Thêm loại sản phẩm không thành công!");
                    setIsLoading(false);
                  }
                })
                .catch((err) => {});
            })
            .catch((err) => {
              notify(0, "Thêm loại sản phẩm không thành công!");
              setIsLoading(false);
            });
        } else {
          createCategory({
            name,
            parentId,
            enabled,
          })
            .then((resp) => {
              if (resp.status === "OK") {
                notify(1, "Thêm loại sản phẩm thành công!");
                navigate("/category");
              } else {
                notify(0, "Thêm loại sản phẩm không thành công!");
                setIsLoading(false);
              }
            })
            .catch(() => {
              notify(0, "Thêm loại sản phẩm không thành công!");
              setIsLoading(false);
            });
        }

        break;

      case "update":
        console.log("update");
        if (file) {
          uploadImageCategory({ image: file })
            .then((resp) => {
              if (resp.status === "OK") {
                updateCategory(category.id, {
                  name,
                  parentId,
                  enabled,
                  imageUrl: resp.data.url,
                })
                  .then((resp) => {
                    if (resp.status === "OK") {
                      notify(1, "Cập nhật thông tin loại sản phẩm thành công!");
                      navigate("/category");
                    } else {
                      return Promise.reject(new Error(resp.message));
                    }
                  })
                  .catch((err) => {
                    notify(
                      0,
                      "Cập nhật thông tin loại sản phẩm không thành công!"
                    );
                    setIsLoading(false);
                  });
              } else {
                return Promise.reject(new Error(resp.message));
              }
            })
            .catch((err) => {
              notify(0, "Cập nhật thông tin loại sản phẩm không thành công!");
              setIsLoading(false);
            });
        } else {
          updateCategory(category.id, {
            name,
            parentId,
            enabled,
          })
            .then((resp) => {
              if (resp.status === "OK") {
                notify(1, "Cập nhật thông tin loại sản phẩm thành công!");
                navigate("/category");
              } else {
                return Promise.reject(new Error(resp.message));
              }
            })
            .catch((err) => {
              notify(0, "Cập nhật thông tin loại sản phẩm không thành công!");
              setIsLoading(false);
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
                {preview && (
                  <div class="image h-48 w-48 mx-auto mb-4">
                    <img
                      src={preview}
                      alt=""
                      class="border-2 border-gray-400 object-cover"
                    />
                  </div>
                )}
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Tên loại sản phẩm"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <div className="select">
                      <select
                        value={parentId}
                        onChange={(e) => setParentId(e.target.value)}
                      >
                        <option value={null}>Loại sản phẩm cha</option>
                        {listCategory.map((c) => (
                          <option value={c.id}>
                            {c.name +
                              (c.parent ? " - " + c.allParentNames : "")}
                          </option>
                        ))}
                      </select>
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
                          onClick={(e) => setEnabled(e.target.checked)}
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

export default CategoryFrom;
