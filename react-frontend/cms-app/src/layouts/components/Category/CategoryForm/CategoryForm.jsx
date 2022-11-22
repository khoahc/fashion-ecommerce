import { useEffect, useState } from "react";
import categoryApi from "../../../../services/axios/categoryApi";
import BackButton from "../../../../components/BackButton/BackButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const { getAllCategories, createCategory, uploadImageCategory } = categoryApi;

const CategoryFrom = ({ category }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("create");

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [file, setFile] = useState(null);

  const [preview, setPreview] = useState(
    "https://res.cloudinary.com/hauhc/image/upload/v1667777483/lizi/categories/default-image_v2azdj.jpg"
  );

  const [listCategory, setListCategory] = useState([]);

  const getData = async () => {
    const resp = await getAllCategories();
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
      setImageUrl(category.image);
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

    switch (mode) {
      case "create":
        if (file) {
          uploadImageCategory({ image: file })
            .then((resp) => {
              if (resp.status === "OK") {
                return resp.data;
              } else {
                toast.error("Thêm loại sản phẩm không thành công!", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1900,
                });
              }
            })
            .then((data) => {
              createCategory({
                name,
                parentId,
                enabled,
                imageUrl: data.url,
              });
            });
        } else {
          createCategory({
            name,
            parentId,
            imageUrl,
            enabled,
          })
            .then((resp) => {
              if (resp.status === "OK") {
                toast.success("Thêm loại sản phẩm thành công!", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 1900,
                });
                navigate("/category");
              } else {
                toast.error("Thêm loại sản phẩm không thành công!", {
                  position: toast.POSITION.TOP_RIGHT,
                });
              }
            })
            .catch(() => {
              toast.error("Thêm loại sản phẩm không thành công!", {
                position: toast.POSITION.TOP_RIGHT,
              });
            });
        }
        
        break;

      case "update":
        console.log("update");
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
                <div class="image h-48 w-48 mx-auto mb-4">
                  <img
                    src={preview}
                    alt=""
                    class="border-2 border-gray-400 object-cover"
                  />
                </div>
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

export default CategoryFrom;
