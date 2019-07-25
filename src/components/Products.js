import React, { Fragment } from 'react';
import ProductListItem from './ProductListItem';

const Products = ({ products, saveRefreshProducts }) => {
    return (
        <Fragment>
            <h1 className="text-center">Productos</h1>
            <ul className="list-group mt-5">
                {products.map(product => (
                    <ProductListItem key={product.id} product={product} saveRefreshProducts={saveRefreshProducts} />
                ))}
            </ul>
        </Fragment>
    );
};

export default Products;
