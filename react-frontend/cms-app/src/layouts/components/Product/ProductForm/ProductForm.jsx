import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../../../../components/BackButton/BackButton";
import { setCategoryId, setCost, setDescription, setEnabled, setName, setPrice } from "../../../../redux/product/productForm/productFormSlice";
import categoryApi from "../../../../services/axios/categoryApi";
import productApi from "../../../../services/axios/productApi";
import ProductOptionForm from "../ProductOptionForm/ProductOptionForm";

const { getAllLevel3Categories } = categoryApi;
const { createProduct } = productApi;

const ProductForm = ({ product }) => {
  const { form } = useSelector((state) => state.productForm);
  const dispatch = useDispatch();

  const [mode, setMode] = useState("create");
  const navigate = useNavigate();
  const [listLevel3Category, setListLevel3Category] = useState([]);

  const onSubmitHandle = (e) => {
    e.preventDefault();

    console.log(form);

    switch (mode) {
      case "create":
        createProduct({
          name: form.name,
          description: form.description,
          enabled: form.enabled,
          cost: form.cost,
          price: form.price,
          categoryId: form.categoryId,
        }).then((resp) => {
          if (resp.status === "OK") {
            toast.success("Thêm sản phẩm thành công!", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1900,
            });
            navigate("/product");
          } else {
            toast.success("Thêm sản phẩm không thành công!", {
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

  const getData = async () => {
    getAllLevel3Categories()
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        setListLevel3Category(data);
      });
  };

  useEffect(() => {
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
    getData();
  }, []);

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
                      <label class="label">Tên sản phẩm</label>
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
                      <div className="control">
                        <div className="select">
                          <select
                            value={form.categoryId}
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
                        </div>
                      </div>
                    </div>
                    <div class="field">
                      <label class="label">Mô tả sản phẩm</label>
                      <div class="control">
                        <textarea
                          class="textarea"
                          placeholder="Mô tả sản phẩm"
                          defaultValue={form.description}
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
                  <ProductOptionForm />
                </div>
              </div>
            </div>
          </div>

          <hr />

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
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
