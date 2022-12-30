import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getProducts,
  productsSelectors,
  deleteProduct,
} from '../features/productSlice';

const ShowProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsSelectors.selectAll);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="box mt-4">
      <Link to="add" className="button is-success">
        Add Product
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <th>{index + 1}</th>
              <th>{product.title}</th>
              <th>{product.price}$</th>
              <th>
                <Link
                  to={`edit/${product.id}`}
                  className="button is-info is-small"
                >
                  Edit
                </Link>
                <button
                  onClick={() => dispatch(deleteProduct(product.id))}
                  className="button is-danger is-small ml-3"
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProducts;
