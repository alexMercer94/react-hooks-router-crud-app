import React from 'react';
import { Link } from 'react-router-dom';

const ProductListItem = ({ product }) => {
    /**
     * Delete a product
     * @param {*} id Product's ID
     */
    const deleteProduct = id => {
        console.log(`Deleting: ${id}`);
        // ! TODO: Eliminar los registros
    };

    return (
        <li
            data-category={product.categoria}
            className="list-group-item d-flex justify-content-between align-items-center"
        >
            <p>
                {product.nombrePlatillo} <span className="font-weight-bold">${product.precioPlatillo}</span>
            </p>
            <div>
                <Link to={`/products/edit/${product.id}`} className="btn btn-success mr-2">
                    Editar
                </Link>
                <button type="button" className="btn btn-danger" onClick={() => deleteProduct(product.id)}>
                    Eliminar &times;
                </button>
            </div>
        </li>
    );
};

export default ProductListItem;
