import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import notify from "../../../../utils/notify";
import ProductOptionFormDetail from "../ProductOptionFormDetail";

const { getAllLevel3Categories, getAllCategories } = categoryApi;
const { updateProduct } = productApi;

const ProductFormDetail = () => {
  const { form } = useSelector((state) => state.productForm);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [listLevel3Category, setListLevel3Category] = useState([]);
  const [imageOptions, setImageOptions] = useState([
    {
      mainImage: null,
      images: [],
    },
  ]);
  const [allCategory, setAllCategory] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoadedCategoryTree, setIsLoadedCategoryTree] = useState(false);
  const [categoryArr, setCategoryArr] = useState([
    {
      level: 1,
      categoryId: null,
      valueArr: [],
    },
  ]);
  const [isEnableAddCategory, setIsEnableAddCategory] = useState(false);

  const validateForm = () => {};

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

  const onSubmitHandle = (e) => {
    e.preventDefault();

    const data = {
      name: form.name,
      categoryId: form.categoryId,
      description: form.description,
      cost: form.cost,
      price: form.price,
      enabled: form.enabled,
    };

    setIsLoading(true);
    updateProduct(form.id, data)
      .then((resp) => {
        if (resp.status === "OK") {
          notify(1, "Cập nhật thông tin sản phẩm thành công");
          navigate("/product");
        } else {
          return Promise.reject(resp.message);
        }
      })
      .catch((error) => notify(0, "Cập nhật sản phẩm không thành công"))
      .finally(() => {
        setIsLoading(false);
      });
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

  useEffect(() => {
    getDataAllCategory({ params: { isAll: true } });
  }, []);

  useEffect(() => {
    if (!isFirstLoad && form.category && !isLoadedCategoryTree) {
      const categoryArrData = [];
      getCategoryTree(form.category).forEach((c, i) => {
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
      setIsLoadedCategoryTree(true);
    }
  }, [isFirstLoad, form]);

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
                        {/* <div className="select">
                          <select
                            value={form.category && form.category.id}
                            onChange={(e) => {
                              dispatch(setCategoryId(e.target.value));
                            }}
                          >
                            <option value={null}>Loại sản phẩm</option>
                            {listLevel3Category.map((c) => (
                              <option value={c.id}>
                                {c.name +
                                  (c.parent ? " - " + c.allParentNames : "")}
                              </option>
                            ))}
                          </select>
                        </div> */}
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
              <div
                class="tab-pane fade"
                id="tabs-profile"
                role="tabpanel"
                aria-labelledby="tabs-profile-tab"
              >
                <div className="productOptionGroup">
                  <ProductOptionFormDetail
                    imageOptions={imageOptions}
                    setImageOptions={setImageOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductFormDetail;
