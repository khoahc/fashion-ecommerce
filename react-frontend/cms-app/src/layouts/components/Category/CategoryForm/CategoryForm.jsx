import { useEffect, useState } from "react";
import categoryApi from "../../../../services/axios/categoryApi";
import BackButton from "../../../../components/BackButton/BackButton";
import { useNavigate } from "react-router-dom";
import notify from "../../../../utils/notify";
import { LoadingButton } from "@mui/lab";
import { setCategoryId } from "../../../../redux/product/productForm/productFormSlice";

const {
  getAllLevel1And2Categories,
  createCategory,
  updateCategory,
  uploadImageCategory,
  getAllCategories,
} = categoryApi;

const CategoryFrom = ({ category }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("create");

  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(null);
  const [enabled, setEnabled] = useState(false);
  const [file, setFile] = useState(null);
  const [allCategory, setAllCategory] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [categoryArr, setCategoryArr] = useState([
    {
      level: 1,
      categoryId: null,
      valueArr: [],
    },
  ]);
  const [isEnableAddCategory, setIsEnableAddCategory] = useState(false);

  // const [preview, setPreview] = useState(
  //   "https://res.cloudinary.com/hauhc/image/upload/v1667777483/lizi/categories/default-image_v2azdj.jpg"
  // );
  const [preview, setPreview] = useState(null);
  const [listCategory, setListCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChooseCategory = (e, i) => {
    setParentId(e.target.value);
    categoryArr[i].categoryId = e.target.value;
    setCategoryArr(categoryArr.slice(0, i + 1));
    if (isHaveChildren(e.target.value)) {
      setIsEnableAddCategory(true);
    } else {
      setIsEnableAddCategory(false);
    }
  };

  const onAddCategory = (e) => {
    setIsEnableAddCategory(false);
    const currentIndex = categoryArr.length - 1;
    const parentId = categoryArr[currentIndex].categoryId;
    const nextLevel = categoryArr[currentIndex].level + 1;
    const data = getCategoryChild(parentId);
    console.log(data);
    setCategoryArr([
      ...categoryArr,
      {
        level: nextLevel,
        categoryId: null,
        valueArr: data,
      },
    ]);
  };

  const getDataAllCategory = async ({ params }) => {
    getAllCategories({ params })
      .then((resp) => {
        console.log(resp);
        if (resp.status === "OK") {
          setAllCategory(resp.data);
        } else {
          return new Promise.reject(resp.message);
        }
        setIsFirstLoad(false);
      })
      .catch((error) => notify(0, error));
  };

  const getDataCategoryLevel1 = () => {
    return allCategory.filter((c) => !c.parent);
  };

  const getCategoryChild = (parentId) => {
    return allCategory.filter((c) => {
      if (c.parent && c.parent.id == parentId) {
        console.log(c);
      }
      return c.parent != null && c.parent.id == parentId;
    });
  };

  const getCategoryTree = (category) => {
    const result = [category];

    let parent = category.parent;
    while (parent) {
      result.push(parent);
      parent = parent.parent;
    }

    return result.reverse();
  };

  const isHaveChildren = (parentId) => {
    for (let c of allCategory) {
      if (c.parent && c.parent.id == parentId) {
        return true;
      }
    }
    return false;
  };

  const getData = async () => {
    const resp = await getAllLevel1And2Categories();
    setListCategory(resp.data);
  };

  useEffect(() => {
    getDataAllCategory({ params: { isAll: true } });
  }, []);

  useEffect(() => {
    if (!isFirstLoad) {
      const categoryArrCp = categoryArr.map((c, i) => {
        if (i === 0) {
          const data = getDataCategoryLevel1();
          return {
            level: c.level,
            categoryId: c.categoryId,
            valueArr: data,
          };
        }
        return c;
      });
      setCategoryArr(categoryArrCp);
    }
  }, [isFirstLoad]);

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

  useEffect(() => {
    if (category && categoryArr && category.parent) {
      const categoryArrData = [];
      getCategoryTree(category.parent).forEach((c, i) => {
        let data;
        if (i === 0) {
          data = getDataCategoryLevel1();
        } else {
          data = getCategoryChild(c.parent.id);
        }

        categoryArrData.push({
          level: i + 1,
          categoryId: c.id,
          valueArr: data,
        });
      });

      setCategoryArr(categoryArrData);
    }
  }, [category, allCategory]);

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
                      <label className="label">Tên loại sản phẩm</label>
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
                      <label className="label">Loại sản phẩm cha</label>
                  <div className="control flex flex-wrap">
                    {categoryArr.map((c, i) => (
                      <>
                        <div
                          className="select mr-8"
                          style={{ minWidth: "150px" }}
                        >
                          <select
                            value={categoryArr[i].categoryId}
                            i={i}
                            onChange={(e) => onChooseCategory(e, i)}
                          >
                            <option value={null}>Loại sản phẩm</option>
                            {categoryArr[i].valueArr.map((c) => (
                              <option value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      </>
                    ))}
                    {isEnableAddCategory && (
                      <button
                        type="button"
                        className="text-blue-700 text-2xl"
                        onClick={onAddCategory}
                      >
                        <span class="icon">
                          <i className="mdi mdi-plus-circle"></i>
                        </span>
                      </button>
                    )}
                    {/* <div className="select">
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
                    </div> */}
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
