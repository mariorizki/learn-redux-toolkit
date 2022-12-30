import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProducts,
  productsSelectors,
  updateProduct,
} from '../features/productSlice';
import { useParams, useNavigate } from 'react-router';

const EditProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const product = useSelector((state) =>
    productsSelectors.selectById(state, id)
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
    }
  }, [dispatch]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (title != '' && price !== '') {
      await dispatch(updateProduct({ id, title, price }));
      navigate('/');
    } else {
      alert('Please fill all fields!');
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate} className="box mt-5">
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
              type="text"
              className="input"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <button className="button is-success">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
