import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    const response = await axios.get('http://localhost:5000/products');
    return response.data;
  }
);

export const saveProduct = createAsyncThunk(
  'products/saveProduct',
  async ({ title, price }) => {
    const response = await axios.post('http://localhost:5000/products', {
      title,
      price,
    });
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, title, price }) => {
    const response = await axios.patch(`http://localhost:5000/products/${id}`, {
      title,
      price,
    });
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id) => {
    const response = await axios.delete(`http://localhost:5000/products/${id}`);
    return id;
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
    [saveProduct.fulfilled]: (state, action) => {
      productsEntity.addOne(state, action.payload);
    },
    [deleteProduct.fulfilled]: (state, action) => {
      productsEntity.removeOne(state, action.payload);
    },
    [updateProduct.fulfilled]: (state, action) => {
      productsEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    },
  },
});

export const productsSelectors = productsEntity.getSelectors(
  (state) => state.product
);

export default productSlice.reducer;
