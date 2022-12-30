import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await axios.get(
      'https://my.api.mockaroo.com/products.json?key=54198be0'
    );
    return response.data;
  }
);

const productsEntity = createEntityAdapter({
  selectId: (product) => product.id,
});

const productSlice = createSlice({
  name: 'product',
  initialState: productsEntity.getInitialState(),
  extraReducers: {
    [getProducts.fulfilled]: (state, action) => {
      productsEntity.setAll(state, action.payload);
    },
  },
});

export const productsSelectors = productsEntity.getSelectors(
  (state) => state.product
);

export default productSlice.reducer;
