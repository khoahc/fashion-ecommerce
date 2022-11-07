import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../../../../components/BackButton/BackButton";
import categoryApi from "../../../../services/axios/categoryApi";
import productApi from "../../../../services/axios/productApi";

const { getAllLevel3Categories } = categoryApi;
const { createProduct } = productApi;

const ProductForm = ({ product }) => {
  const [mode, setMode] = useState("create");
  const navigate = useNavigate();
  const [listLevel3Category, setListLevel3Category] = useState([]);

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(0);
  const [vouchersId, setVouchersId] = useState([]);

  const onSubmitHandle = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(categoryId);
    console.log(description);
    console.log(enabled);
    console.log(cost);
    console.log(price);
    console.log(vouchersId);

    switch (mode) {
      case "create":
        createProduct({
          name,
          description,
          enabled,
          cost,
          price,
          categoryId,
          vouchersId,
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
      setName(product.name);
      setCategoryId(product.category ? product.category.id : null);
      setDescription(product.description);
      setEnabled(product.enabled);
      setCost(product.cost);
      setPrice(product.price);
    }
  }, [product]);

  useEffect(() => {
    getData();
  }, []);

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
                      placeholder="Tên sản phẩm"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <div className="select">
                      <select
                        value={categoryId}
                        onChange={(e) => {
                          setCategoryId(e.target.value);
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
                  <div class="control">
                    <textarea
                      class="textarea"
                      placeholder="Mô tả sản phẩm"
                      defaultValue={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type={"number"}
                      placeholder="Chi phí"
                      value={cost}
                      onChange={(e) => {
                        setCost(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type={"number"}
                      placeholder="Giá bán"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
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
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Voucher"
                      value={""}
                      onChange={(e) => {}}
                    />
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

export default ProductForm;
