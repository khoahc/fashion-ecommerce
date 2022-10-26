import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
  value: items,
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const duplicate = state.value.filter(
        (e) =>
          e.slugProduct === newItem.slugProduct &&
          e.slugColor === newItem.slugColor &&
          e.size === newItem.size
      );
      if (duplicate.length > 0) {
        state.value = state.value.filter(
          (e) =>
            e.slugProduct !== newItem.slugProduct ||
            e.slugColor !== newItem.slugColor ||
            e.size !== newItem.size
        );
        state.value = [
          ...state.value,
          {
            id: duplicate[0].id,
            slugProduct: newItem.slugProduct,
            slugColor: newItem.slugColor,
            size: newItem.size,
            price: newItem.price,
            count: Number(newItem.count) + Number(duplicate[0].count),
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...action.payload,
            id:
              state.value.length > 0
                ? state.value[state.value.length - 1].id + 1
                : 1,
          },
        ];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
    },
    updateItem: (state, action) => {
      console.log("udate");
      const newItem = action.payload;
      console.log(newItem);
      const item = state.value.filter(
        (e) =>
          e.slugProduct === newItem.slugProduct &&
          e.slugColor === newItem.slugColor &&
          e.size === newItem.size
      );
      console.log(JSON.stringify(item));
      if (item.length > 0) {
        state.value = state.value.filter(
          (e) =>
            e.slugProduct !== newItem.slugProduct ||
            e.slugColor !== newItem.slugColor ||
            e.size !== newItem.size
        );
        console.log(newItem);
        state.value = [
          ...state.value,
          {
            id: item[0].id,
            slugProduct: newItem.slugProduct,
            slugColor: newItem.slugColor,
            size: newItem.size,
            price: newItem.price,
            count: newItem.count,
          },
        ];
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
    },
    removeItem: (state, action) => {
      const item = action.payload;
      state.value = state.value.filter(
        (e) =>
          e.slugProduct !== item.slugProduct || e.slugColor !== item.slugColor || e.size !== item.size
      );
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
        )
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, updateItem } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
