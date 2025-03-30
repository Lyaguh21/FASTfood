import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface cartItem {
  id: number;
  count: number;
}
export interface CartState {
  items: cartItem[];
}
const initialState: CartState = {
  items: [],
};

//Добавление в корзину
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
      } else {
        state.items.map((i) => {
          if (i.id === action.payload) {
            i.count += 1;
            return;
          }
          return i;
        });
      }
    },
  },
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;
