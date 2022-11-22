import { createSlice } from "@reduxjs/toolkit";

const initialForm = {
  id: null,
  name: "",
  description: "",
  enabled: false,
  cost: 0,
  price: 0,
  categoryId: null,
  options: [
    {
      id: null,
      colorId: null,
      sizes: [
        {
          size: "",
          quantity: 0,
        },
      ],
      mainImageId: null,
      imageIds: [],
    },
  ],
  voucherIds: [],
};

const initialImagesOptions = [
  {
    mainImage: null,
    images: []
  }
]

const initialState = {
  loading: false,
  form: initialForm,
  imagesOptions: initialImagesOptions,
  error: null,
  success: false,
};

const productFormSlice = createSlice({
  name: "productForm",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.form.name = action.payload;
    },
    setDescription: (state, action) => {
      state.form.description = action.payload;
    },
    setEnabled: (state, action) => {
      state.form.enabled = action.payload;
    },
    setCost: (state, action) => {
      state.form.cost = action.payload;
    },
    setPrice: (state, action) => {
      state.form.price = action.payload;
    },
    setCategoryId: (state, action) => {
      state.form.categoryId = action.payload;
    },
    setColorId: (state, action) => {
      state.form.options[action.payload.optionId].colorId =
        action.payload.colorId;
    },
    setSize: (state, action) => {
      console.log(action);
      state.form.options[action.payload.optionIndex].sizes[
        action.payload.sizeIndex
      ].size = action.payload.size;
    },
    setQuantity: (state, action) => {
      state.form.options[action.payload.optionIndex].sizes[
        action.payload.sizeIndex
      ].quantity = action.payload.quantity;
    },
    addOption: (state) => {
      state.form.options.push({
        id: null,
        colorId: null,
        sizes: [
          {
            size: "",
            quantity: 0,
          },
        ],
        mainImageId: null,
        imageIds: [],
      });
    },
    removeOption: (state, action) => {
      console.log(action.payload);
      if (state.form.options.length > 1) {
        state.form.options.splice(action.payload, 1);
      }
    },
    addSizeToOption: (state, action) => {
      state.form.options[action.payload].sizes.push({
        size: "",
        quantity: 0,
      });
    },
    removeSizeInOption: (state, action) => {
      if (state.form.options[action.payload.optionIndex].sizes.length > 1) {
        state.form.options[action.payload.optionIndex].sizes.splice(
          action.payload.sizeIndex,
          1
        );
      }
    },
    clear: (state) => {
      state.form = initialForm;
    },
    setMainImage: (state, action) => {
      state.imagesOptions[action.payload.optionIndex].mainImage = action.payload.image;
    }
  },
  extraReducers: {},
});

export const {
  setName,
  setDescription,
  setEnabled,
  setCost,
  setPrice,
  setCategoryId,
  setColorId,
  setSize,
  setQuantity,
  addOption,
  removeOption,
  addSizeToOption,
  removeSizeInOption,
  clear,
  setMainImage,
} = productFormSlice.actions;
export default productFormSlice.reducer;
