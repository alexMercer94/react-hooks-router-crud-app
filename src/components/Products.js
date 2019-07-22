import React, { Fragment } from 'react';
import ProductListItem from './ProductListItem';

const Products = ({ products }) => {
    return (
        <Fragment>
            <h1 className="text-center">Productos</h1>
            <ul className="list-group mt-5">
                {products.map(product => (
                    <ProductListItem key={product.id} product={product} />
                ))}
            </ul>
        </Fragment>
    );
};

export default Products;
