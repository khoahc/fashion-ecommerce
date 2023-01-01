import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOption,
  addSizeToOption,
  removeOption,
  removeSizeInOption,
} from "../../../../redux/product/productForm/productFormSlice";
import ColorSelect from "../ColorSelect/ColorSelect";
import ColorSelectDetail from "../ColorSelectDetail";
import SizeRow from "../SizeRow/SizeRow";

const ProductOptionFormDetail = ({ imageOptions, setImageOptions }) => {
  const { options } = useSelector((state) => state.productForm.form);
  const dispatch = useDispatch();

  const handleAddOptionClick = (e) => {
    setImageOptions([...imageOptions, { mainImage: null, images: [] }]);
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
  };

  const addImage = (image, index) => {
    const imageOptionsCp = imageOptions.map((o, i) => {
      console.log("map");
      if (i === index) {
        o.images.push(image);
      }
      return o;
    });

    setImageOptions(imageOptionsCp, index);
  };

  const removeImage = (index, indexImage) => {};

  return (
    <div className="roductOptionForm">
      <div className="card">
        {options.map((ot, index) => (
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
      <button
        type="button"
        className="button blue small"
        onClick={handleAddOptionClick}
      >
        <span class="icon">
          <i className="mdi mdi-newspaper-plus"></i>
        </span>
      </button>
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
          <label className="label min-w-fit mr-4">#{index + 1}</label>
          <div className="row-span-1 grid grid-cols-2 mb-4">
            <div className="w-full">
              <ColorSelectDetail index={index} value={option.color} />
            </div>
            <div className="">
              <div className="float-right buttons nowrap">
                <button
                  type="button"
                  className="button red small"
                  onClick={(e) => {
                    handleRemoveOptionClick(index);
                  }}
                >
                  <span class="icon">
                    <i className="mdi mdi-newspaper-remove"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="row-span-1 grid grid-cols-1 mb-4">
            {option.sizes.map((s, i) => (
              <SizeRow
                optionIndex={index}
                index={i}
                handleAddSizeClick={handleAddSizeClick}
                handleRemoveSizeClick={handleRemoveSizeClick}
              />
            ))}
          </div>

          <div className="mb-4">
            <div className="field">
              <label className="label min-w-fit mr-4">Ảnh chính: </label>
              <div class="field-body">
                <img
                  style={{ maxHeight: "15rem" }}
                  src={option.mainImage}
                  alt=""
                  className="mb-4"
                />
                {/* {previewMainImage && (
                  <img
                    style={{ maxHeight: "15rem" }}
                    src={previewMainImage}
                    alt=""
                    className="mb-4"
                  />
                )} */}
                <div className="field file">
                  <label className="upload control">
                    <span className="button blue small">
                      <span class="icon">
                        <i className="mdi mdi-image-plus"></i>
                      </span>
                    </span>
                    {/* <span className="button blue">Tải ảnh</span> */}
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
            <div className="field">
              <label className="label min-w-fit mr-4">Ảnh bổ sung: </label>
              <div className="field-body">
                <div className="row-span-1 grid grid-cols-4">
                  {option.images &&
                    option.images.map((img) => (
                      <img
                        style={{ maxHeight: "15rem" }}
                        src={img}
                        alt=""
                        className="mb-4"
                      />
                    ))}
                  {/* {previewImages.map((img) => (
                    <img
                      style={{ maxHeight: "15rem" }}
                      className="mb-4"
                      src={img}
                      alt=""
                    />
                  ))} */}
                </div>
                <div className="field file">
                  <label className="upload control">
                    <span className="button blue small">
                      <span class="icon">
                        <i className="mdi mdi-image-plus"></i>
                      </span>
                    </span>
                    {/* <span className="button blue">Thêm ảnh</span> */}
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

export default ProductOptionFormDetail;
