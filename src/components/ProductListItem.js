import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProductListItem = ({ product, saveRefreshProducts }) => {
    /**
     * Delete a product
     * @param {*} id Product's ID
     */
    const deleteProduct = id => {
        Swal.fire({
            title: 'Estas seguro?',
            text: 'Un platillo eliminado no se puede recuperar.',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async result => {
            if (result.value) {
                const URL = `http://localhost:4000/restaurant/${id}`;
                try {
                    const resultado = await axios.delete(URL);

                    if (resultado.status === 200) {
                        Swal.fire('Eliminado!', 'El producto se ha eliminado.', 'success');
                        // Consultar la API
                        saveRefreshProducts(true);
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: 'Hubo un error, vuelve a intentarlo.'
                    });
                }
            }
        });
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
