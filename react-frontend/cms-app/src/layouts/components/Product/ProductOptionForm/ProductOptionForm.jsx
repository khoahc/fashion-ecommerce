import { useEffect } from "react";
import { useState } from "react";
import ChooseImages from "../ChooseImages/ChooseImages";
import ColorSelect from "../ColorSelect/ColorSelect";

const ProductOptionForm = () => {
  const [count, setCount] = useState(0);
  const [productOptions, setProductOptions] = useState([
    {
      index: count,
      size: "",
      color: "",
      quantity: 0,
      image: null,
    },
  ]);

  const handleAddOptionClick = (e) => {
    const newCount = count + 1;
    setCount(newCount);
    setProductOptions([
      ...productOptions,
      {
        index: newCount,
        size: "",
        color: "",
        quantity: 0,
      },
    ]);
  };

  const handleRemoveOptionClick = (index) => {
    setProductOptions(productOptions.filter(pdo => pdo.index !== index));
  }

  return (
    <div className="roductOptionForm">
      <div className="card">
        {productOptions.map((pdo) => (
          <ProductOptionRow key={pdo.index} productOption={pdo} handleRemoveOptionClick={handleRemoveOptionClick} />
        ))}
      </div>
      <button
        type="button"
        className="button blue mt-3"
        onClick={handleAddOptionClick}>+</button>
    </div>
  );
};

const ProductOptionRow = ({ productOption, handleRemoveOptionClick }) => {
    const [index, setIndex] = useState();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setIndex(productOption.index);
    setSize(productOption.size);
    setColor(productOption.color);
    setQuantity(productOption.quantity);
  }, [productOption]);

  return (
    <div className="">
      <div className="productOptionRow card-content">
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Kích thước"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </div>
        </div>
        <ColorSelect />
        <div className="field">
          <div className="control">
            <input
              className="input"
              type="number"
              placeholder="Số lượng"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
        </div>
        <div class="field">
          <div class="field-body">
            <div class="field file">
              <label class="upload control">
                <span class="button blue">Tải ảnh</span>
                <input type="file" onChange={(e) => {}} />
              </label>
            </div>
          </div>
        </div>
        
        <button type="button" className="button red" onClick={(e) => handleRemoveOptionClick(index)}>
          -
        </button>
      </div>
    </div>
  );
};

export default ProductOptionForm;
