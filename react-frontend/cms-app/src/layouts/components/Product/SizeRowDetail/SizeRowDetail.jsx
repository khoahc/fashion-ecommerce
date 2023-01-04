import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuantity } from "../../../../redux/product/productForm/productFormSlice";
import ModalDeleteOption from "../ModalDeleteOption";
import ModalUpdateOptionQuantity from "../ModalUpdateOptionQuantity/ModalUpdateOptionQuantity";

const SizeRowDetail = ({
  handleAddSizeClick,
  handleRemoveSizeClick,
  index,
  idSize,
  optionIndex,
}) => {
  const size = useSelector(
    (state) => state.productForm.form.options[optionIndex].sizes[index]
  );
  const [showModalUpdateQuantity, setShowModalUpdateQuantity] = useState(false);
  const [showModalDeleteOption, setShowModalDeleteOption] = useState(false);
  const dispatch = useDispatch();

  const onClickSave = (e) => {
    setShowModalUpdateQuantity(true);
  };

  const removeSize = (e) => {
    console.log(setShowModalDeleteOption(true));
  };

  return (
    <div className="flex">
      <div className="flex w-full mr-8">
        <div className="field mr-8 w-full">
          <div className="control flex items-center">
            <label className="label min-w-fit mr-4">Size: </label>
            <input
              className="input"
              type="text"
              placeholder="Size"
              value={size.size}
              disabled
            />
          </div>
        </div>
        <div className="field w-full">
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
        <div className="flex flex-row float-right buttons nowrap">
          <button
            type="button"
            className="button blue small rounded-full"
            onClick={onClickSave}
          >
            <span class="icon">
              <i className="mdi mdi-content-save"></i>
            </span>
          </button>

          <button
            type="button"
            className="button red small rounded-full"
            onClick={removeSize}
          >
            <span class="icon">
              <i className="mdi mdi-sticker-remove"></i>
            </span>
          </button>
        </div>
      </div>
      <ModalUpdateOptionQuantity
        showModal={showModalUpdateQuantity}
        setShowModal={setShowModalUpdateQuantity}
        size={size}
      />
      <ModalDeleteOption
        showModal={showModalDeleteOption}
        setShowModal={setShowModalDeleteOption}
        size={size}
      />
    </div>
  );
};

export default SizeRowDetail;
