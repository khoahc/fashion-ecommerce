import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOption,
  addSizeToOption,
  removeOption,
  removeSizeInOption,
  setMainImage,
} from "../../../../redux/product/productForm/productFormSlice";
import ColorSelect from "../ColorSelect/ColorSelect";
import SizeRow from "../SizeRow/SizeRow";

const ProductOptionForm = ({ imageOptions, setImageOptions }) => {
  const { form } = useSelector((state) => state.productForm);
  const dispatch = useDispatch();

  const handleAddOptionClick = (e) => {
    setImageOptions([...imageOptions, {mainImage: null, images: []}])
    dispatch(addOption());
  };

  const handleRemoveOptionClick = (index) => {
    dispatch(removeOption(index));
  };

  const handleSetMainImage = (image, index) => {
    const imageOptionsCp = imageOptions.map((o, i) => {
      console.log("map");
      if (i === index) {
        o.mainImage = image;
      }
      return o;
    });

    setImageOptions(imageOptionsCp, index);
  }

  const addImage = (image, index) => {
    const imageOptionsCp = imageOptions.map((o, i) => {
      console.log("map");
      if (i === index) {
        o.images.push(image);
      }
      return o;
    });

    setImageOptions(imageOptionsCp, index);
  }

  const removeImage = (index, indexImage) => {

  }

  return (
    <div className="roductOptionForm">
      <div className="card">
        {form.options.map((ot, index) => (
          <ProductOptionRow
            index={index}
            option={ot}
            handleAddOptionClick={handleAddOptionClick}
            handleRemoveOptionClick={handleRemoveOptionClick}
            handleSetMainImage={handleSetMainImage}
            addImage={addImage}
          />
        ))}
      </div>
    </div>
  );
};

const ProductOptionRow = ({
  option,
  index,
  handleAddOptionClick,
  handleRemoveOptionClick,
  handleSetMainImage,
  addImage,
}) => {
  const { form } = useSelector((state) => state.productForm);
  const dispatch = useDispatch();

  // const [mainImage, setMainImage] = useState(null);
  const [images, SetImages] = useState([]);
  const [previewMainImage, setPreviewMainImage] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  const onSelectMainImage = (e, index) => {
    console.log("select file");
    if (!e.target.files || e.target.files.length === 0) {
      // dispatch(setMainImage({ image: null, index: index }));
      handleSetMainImage(null, index);
      setPreviewMainImage(
        "https://res.cloudinary.com/hauhc/image/upload/v1668745224/lizi/thumbnail_image_default_bgvxgk.jpg"
      );
      return;
    }

    // dispatch(setMainImage({ image: e.target.files[0], index: index }));
    handleSetMainImage(e.target.files[0], index);
    setPreviewMainImage(URL.createObjectURL(e.target.files[0]));
  };

  const onSelectImages = (e) => {
    console.log("select file");
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    addImage(e.target.files[0], index);
    SetImages([...images, e.target.files[0]]);
    setPreviewImages([
      ...previewImages,
      URL.createObjectURL(e.target.files[0]),
    ]);
    console.log(previewImages);
  };

  const handleAddSizeClick = (e) => {
    dispatch(addSizeToOption(index));
  };

  const handleRemoveSizeClick = (sizeIndex) => {
    dispatch(removeSizeInOption({ optionIndex: index, sizeIndex: sizeIndex }));
  };

  return (
    <div className="">
      <div className="productOptionRow card-content">
        <div className="w-full">
          <div className="row-span-1 grid grid-cols-2 mb-3">
            <div className="w-full">
              <ColorSelect index={index} />
            </div>
            <div className="">
              <div className="float-right">
                <button
                  type="button"
                  className="button blue"
                  onClick={handleAddOptionClick}
                >
                  +
                </button>
                <button
                  type="button"
                  className="button red"
                  onClick={(e) => {
                    handleRemoveOptionClick(index);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>
          <div className="row-span-1 grid grid-cols-3 mb-3">
            {option.sizes.map((s, i) => (
              <SizeRow
                optionIndex={index}
                index={i}
                handleAddSizeClick={handleAddSizeClick}
                handleRemoveSizeClick={handleRemoveSizeClick}
              />
            ))}
          </div>

          <div className="mb-3">
            <div class="field">
              <div class="field-body">
                <img
                  style={{ maxHeight: "10rem" }}
                  src={
                    previewMainImage ||
                    "https://res.cloudinary.com/hauhc/image/upload/v1668745224/lizi/thumbnail_image_default_bgvxgk.jpg"
                  }
                  alt=""
                />
                <div class="field file">
                  <label class="upload control">
                    <span class="button blue">Ảnh chính</span>
                    <input
                      type="file"
                      onChange={(e) => onSelectMainImage(e, index)}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="field">
              <div class="field-body">
                {previewImages.map((img) => (
                  <img style={{ maxHeight: "10rem" }} src={img} alt="" />
                ))}
                <div class="field file">
                  <label class="upload control">
                    <span class="button blue">Ảnh Bổ sung</span>
                    <input type="file" onChange={onSelectImages} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ProductOptionForm;
