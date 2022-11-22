import { useDispatch, useSelector } from "react-redux";
import { setQuantity, setSize } from "../../../../redux/product/productForm/productFormSlice";

const SizeRow = ({
  handleAddSizeClick,
  handleRemoveSizeClick,
  index,
  optionIndex,
}) => {
  const size = useSelector(
    (state) => state.productForm.form.options[optionIndex].sizes[index]
  );
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <div className="field">
          <div className="control flex items-center">
            <label className="label min-w-fit mr-4">Size: </label>
            <input
              className="input"
              type="text"
              placeholder="Size"
              value={size.size}
              onChange={(e) => {
                dispatch(
                  setSize({
                    optionIndex: optionIndex,
                    sizeIndex: index,
                    size: e.target.value,
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="field">
          <div className="control flex items-center">
            <label className="label min-w-fit mr-4">Số lượng: </label>
            <input
              className="input"
              type="number"
              placeholder="Số lượng"
              value={size.quantity}
              onChange={(e) => {
                dispatch(
                  setQuantity({
                    optionIndex: optionIndex,
                    sizeIndex: index,
                    quantity: e.target.valueAsNumber,
                  })
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-auto">
        <div className="float-right">
          <button
            type="button"
            className="button blue"
            onClick={handleAddSizeClick}
          >
            +
          </button>
          <button
            type="button"
            className="button red"
            onClick={(e) => handleRemoveSizeClick(index)}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default SizeRow;
