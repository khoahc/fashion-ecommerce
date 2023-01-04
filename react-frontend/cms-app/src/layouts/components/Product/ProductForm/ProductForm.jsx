import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import notify from "../../../../utils/notify";
import BackButton from "../../../../components/BackButton/BackButton";
import {
  clear,
  setCategoryId,
  setCost,
  setDescription,
  setEnabled,
  setName,
  setPrice,
} from "../../../../redux/product/productForm/productFormSlice";
import categoryApi from "../../../../services/axios/categoryApi";
import productApi from "../../../../services/axios/productApi";
import ProductOptionForm from "../ProductOptionForm/ProductOptionForm";
import { LoadingButton } from "@mui/lab";

const { getAllLevel3Categories, getByLevel, getChildren, getAllCategories } =
  categoryApi;
const { createProduct, uploadImageProduct } = productApi;

const ProductForm = ({ product }) => {
  const { form } = useSelector((state) => state.productForm);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [mode, setMode] = useState("create");
  const navigate = useNavigate();
  const [allCategory, setAllCategory] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // const [listLevel3Category, setListLevel3Category] = useState([]);
  const [imageOptions, setImageOptions] = useState([
    {
      mainImage: null,
      images: [],
    },
  ]);
  const [categoryArr, setCategoryArr] = useState([
    {
      level: 1,
      categoryId: null,
      valueArr: [],
    },
  ]);
  const [isEnableAddCategory, setIsEnableAddCategory] = useState(false);

  const validateForm = () => {};

  const onSubmitHandle = (e) => {
    e.preventDefault();

    console.log(form);
    console.log(imageOptions);

    switch (mode) {
      case "create":
        setIsLoading(true);
        const uploads = [];
        imageOptions.forEach((o, index) => {
          uploads.push(
            uploadImageProduct({ image: o.mainImage })
              .then((resp) => {
                if (resp.status === "OK") {
                  return resp.data;
                }
              })
              .then((data) => {
                const uploadImages = [];
                o.images.forEach((img, i) => {
                  uploadImages.push(
                    uploadImageProduct({ image: img }).then((resp) => {
                      if (resp.status === "OK") {
                        return Promise.resolve(resp.data);
                      }
                    })
                  );
                });

                return Promise.all(uploadImages).then((respImages) =>
                  Promise.resolve({ mainImage: data, images: respImages })
                );
              })
          );
        });

        Promise.all(uploads)
          .then((resp) => {
            console.log(resp);
            let data = structuredClone(form);
            console.log(data);
            resp.forEach((o, i) => {
              data.options[i].mainImageId = o.mainImage.id;
              data.options[i].imageIds = o.images.map((img) => img.id);
            });
            return data;
          })
          .then((data) => {
            createProduct(data).then((resp) => {
              if (resp.status === "OK") {
                notify(1, "Thêm sản phẩm thành công");
                navigate("/product");
              } else {
                notify(0, "Thêm sản phẩm thất bại");
              }
            });
          })
          .catch((error) => notify(0, "Thêm sản phẩm thất bại"))
          .finally(() => setIsLoading(false));

        // uploadImageProduct()

        // createProduct({
        //   name: form.name,
        //   description: form.description,
        //   enabled: form.enabled,
        //   cost: form.cost,
        //   price: form.price,
        //   categoryId: form.categoryId,
        // }).then((resp) => {
        //   if (resp.status === "OK") {
        //     toast.success("Thêm sản phẩm thành công!", {
        //       position: toast.POSITION.TOP_RIGHT,
        //       autoClose: 1900,
        //     });
        //     navigate("/product");
        //   } else {
        //     toast.success("Thêm sản phẩm không thành công!", {
        //       position: toast.POSITION.TOP_RIGHT,
        //       autoClose: 1900,
        //     });
        //   }
        // });
        break;

      case "update":
        break;

      default:
        break;
    }
  };

  const onChooseCategory = (e, i) => {
    dispatch(setCategoryId(e.target.value));
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

  const isHaveChildren = (parentId) => {
    for (let c of allCategory) {
      if (c.parent && c.parent.id == parentId) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    dispatch(clear());
    if (product) {
      console.log(product);
      setMode("update");
      dispatch(setName(product.name));
      dispatch(setCategoryId(product.category ? product.category.id : null));
      dispatch(setDescription(product.description));
      dispatch(setEnabled(product.enabled));
      dispatch(setCost(product.cost));
      dispatch(setPrice(product.price));
    }
  }, [dispatch, product]);

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

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="card mb-0">
      <form onSubmit={onSubmitHandle}>
        <div className="card-content px-6 pt-0">
          <div>
            <ul
              class="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4"
              id="tabs-tab"
              role="tablist"
            >
              <li class="nav-item" role="presentation">
                <a
                  href="#tabs-home"
                  class="nav-link block font-bold text-base leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent active"
                  id="tabs-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#tabs-home"
                  role="tab"
                  aria-controls="tabs-home"
                  aria-selected="true"
                >
                  Tổng quan
                </a>
              </li>
              <li class="nav-item" role="presentation">
                <a
                  href="#tabs-profile"
                  class="nav-link block font-bold text-base leading-tight border-x-0 border-t-0 border-b-2 border-transparent px-6 py-3 my-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent"
                  id="tabs-profile-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#tabs-profile"
                  role="tab"
                  aria-controls="tabs-profile"
                  aria-selected="false"
                >
                  Kiểu dáng
                </a>
              </li>
            </ul>
            <div class="tab-content" id="tabs-tabContent">
              <div
                class="tab-pane fade show active"
                id="tabs-home"
                role="tabpanel"
                aria-labelledby="tabs-home-tab"
              >
                <div className="field">
                  <div className="field-body">
                    <div className="field">
                      <label className="label">Tên sản phẩm</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="Tên sản phẩm"
                          value={form.name}
                          onChange={(e) => {
                            dispatch(setName(e.target.value));
                          }}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label class="label">Loại sản phẩm</label>
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
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Mô tả sản phẩm</label>
                      <div class="control">
                        <textarea
                          class="textarea"
                          placeholder="Mô tả sản phẩm"
                          value={form.description}
                          onChange={(e) => {
                            dispatch(setDescription(e.target.value));
                          }}
                          rows={8}
                          cols={8}
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex flex-row aliig items-center justify-center">
                      <div className="field grow">
                        <label class="label">Giá nhập</label>
                        <div className="control">
                          <input
                            className="input"
                            type={"number"}
                            placeholder="Giá nhập"
                            value={form.cost}
                            onChange={(e) => {
                              dispatch(setCost(e.target.valueAsNumber));
                            }}
                          />
                        </div>
                      </div>
                      <span className="px-6"></span>
                      <div className="field grow mb-3">
                        <label class="label">Giá bán</label>
                        <div className="control">
                          <input
                            className="input"
                            type={"number"}
                            placeholder="Giá bán"
                            value={form.price}
                            onChange={(e) => {
                              dispatch(setPrice(e.target.valueAsNumber));
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="field-body">
                        <div className="field">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={form.enabled}
                              onClick={(e) => {
                                dispatch(setEnabled(e.target.checked));
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
              </div>
              <div
                class="tab-pane fade"
                id="tabs-profile"
                role="tabpanel"
                aria-labelledby="tabs-profile-tab"
              >
                <div className="productOptionGroup">
                  <ProductOptionForm
                    imageOptions={imageOptions}
                    setImageOptions={setImageOptions}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr />

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
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
