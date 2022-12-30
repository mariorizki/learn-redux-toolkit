import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { saveProduct } from '../features/productSlice';

const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createProduct = async (e) => {
    e.preventDefault();
    if (title !== '' && price !== '') {
      await dispatch(saveProduct({ title, price }));
      navigate('/');
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div>
      <form onSubmit={createProduct} className="box mt-5">
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input
              type="number"
              className="input"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <button className="button is-success">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
