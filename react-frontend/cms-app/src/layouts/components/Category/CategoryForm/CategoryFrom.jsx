import { useEffect, useState } from "react";
import categoryApi from "../../../../services/axios/categoryApi";

const { getAllCategories } = categoryApi;

const CategoryFrom = ({ category }) => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState("");
  const [listCategory, setListCategory] = useState([]);

  const getData = async () => {
    const resp = await getAllCategories();
    console.log(resp);
    setListCategory(resp.data);
  }
  
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
    const readerCoverImage = new FileReader();
    readerCoverImage.readAsDataURL(selectedFile);
    readerCoverImage.onloadend = () => {
      //setCoverImage(String(readerCoverImage.result));
    };

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  return (
    <section class="section main-section">
      <div class="card mb-6">
        <div class="card-content">
          <form method="get">
            <div class="field">
              <div class="field-body">
                <div class="field">
                  <div class="control icons-left">
                    <input
                      class="input"
                      type="text"
                      placeholder="Tên loại sản phẩm"
                      value={category && category.name}
                    />
                    <span class="icon left">
                      <i class="mdi mdi-account"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <div class="select">
                      <select>
                        <option value="" selected>
                          Loại sản phẩm cha
                        </option>
                        { listCategory.map(category => (
                          <option value={category.id}>{category.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="field-body">
                    <div class="field">
                      <label class="switch">
                        <input type="checkbox" value="true"></input>
                        <span class="check"></span>
                        <span class="control-label">Trạng thái</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <div class="field-body">
                    <div className="max-h-52 rounded-full flex items-center justify-center">
                      {selectedFile && (
                        <img
                          style={{
                            width: 200,
                            height: 300,
                            objectFit: "contain",
                          }}
                          className="m-h-52"
                          src={preview}
                          alt=""
                        />
                      )}
                    </div>
                    <div class="field file">
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

            <div class="field grouped mt-10">
              <div class="control">
                <button type="submit" class="button green">
                  Lưu
                </button>
              </div>
              <div class="control">
                <button type="reset" class="button red">
                  Hủy
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CategoryFrom;
