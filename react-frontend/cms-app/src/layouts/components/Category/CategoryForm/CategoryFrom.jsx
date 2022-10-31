import { useEffect, useState } from "react";
import categoryApi from "../../../../services/axios/categoryApi";
import BackButton from "../../../../components/BackButton/BackButton";

const { getAllCategories } = categoryApi;

const CategoryFrom = ({ categoryDataForm, setCategoryDataForm, onSubmitHandle, selectedFile, setSelectedFile }) => {
  const [preview, setPreview] = useState();

  const [listCategory, setListCategory] = useState([]);

  const getData = async () => {
    const resp = await getAllCategories();
    setListCategory(resp.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  }, [selectedFile, categoryDataForm.imageUrl]);

  const onSelectFile = (e) => {
    console.log("select file")
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
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
                      placeholder="Tên loại sản phẩm"
                      value={categoryDataForm.name}
                      onChange={(e) =>
                        setCategoryDataForm({
                          ...categoryDataForm,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <div className="select">
                      <select
                        value={categoryDataForm.parentId}
                        onChange={(e) =>
                          setCategoryDataForm({
                            ...categoryDataForm,
                            parentId: e.target.value,
                          })
                        }
                      >
                        <option value={null}>Loại sản phẩm cha</option>
                        {listCategory.map((c) => (
                          <option value={c.id}>{c.name + (c.parent ? ' - ' + c.allParentNames : '')}</option>
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
                          defaultChecked={categoryDataForm.enabled}
                          onClick={(e) =>
                            setCategoryDataForm({
                              ...categoryDataForm,
                              enabled: e.target.checked,
                            })
                          }
                        />
                        <span className="check"></span>
                        <span className="control-label">Trạng thái</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <div className="field-body">
                    <div className="max-h-52 rounded-full flex items-center justify-center">
                      {selectedFile && (
                        <img
                          style={{
                            height: 300,
                            objectFit: "contain",
                          }}
                          className="m-h-52"
                          src={preview}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="field file">
                      <input
                        type="file"
                        onChange={onSelectFile}
                        className="mt-5"
                      ></input>
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
