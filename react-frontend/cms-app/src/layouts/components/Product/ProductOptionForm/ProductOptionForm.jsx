import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addOption,
  addSizeToOption,
  removeOption,
  removeSizeInOption,
} from "../../../../redux/product/productForm/productFormSlice";
import ColorSelect from "../ColorSelect/ColorSelect";
import SizeRow from "../SizeRow/SizeRow";

const ProductOptionForm = ({ imageOptions, setImageOptions }) => {
  const { form } = useSelector((state) => state.productForm);
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

  const removeImage = (index, imgIndex) => {
    const imageOptionsCp = imageOptions.map((o, i) => {
      console.log("map");
      if (i === index) {
        o.images.splice(imgIndex, 1);
      }
      return o;
    });
    setImageOptions(imageOptionsCp, index);
  };

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
            removeImage={removeImage}
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
  removeImage,
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

  const doRemoveImage = (i, imgI) => {
    removeImage(i, imgI);
    images.splice(imgI, 1);
    console.log(previewImages);
    console.log(imgI);
    console.log(previewImages[imgI]);
    previewImages.splice(imgI, 1);
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
              <ColorSelect index={index} />
            </div>
            <div className="">
              <div className="float-right buttons nowrap">
                {/* <button
                  type="button"
                  className="button blue small"
                  onClick={handleAddOptionClick}
                >
                  <span class="icon">
                    <i className="mdi mdi-newspaper-plus"></i>
                  </span>
                </button> */}
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
                {previewMainImage && (
                  <img
                    style={{ maxHeight: "15rem" }}
                    src={previewMainImage}
                    alt=""
                    className="mb-4"
                  />
                )}
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
                <div className="flex flex-wrap items-center">
                  {previewImages.map((img, i) => (
                    <div className="relative inline-block mr-12 mb-12">
                      <img
                        style={{ maxHeight: "15rem" }}
                        className="mb-4"
                        src={img}
                        alt=""
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 rounded-full hover:text-orange-600"
                        title="Xóa ảnh"
                        onClick={(e) => doRemoveImage(index, i)}
                      >
                        <span class="icon">
                          <i className="mdi mdi-close-circle text-lg"></i>
                        </span>
                      </button>
                    </div>
                  ))}
                  <div className="field file inline-block">
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
      </div>
      <hr />
    </div>
  );
};

export default ProductOptionForm;
