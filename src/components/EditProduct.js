import React, { useState, useRef } from 'react';
import Error from './Error';
import Swal from 'sweetalert2';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const EditProduct = props => {
    const { product, history, saveRefreshProducts } = props;

    // Generar los refs
    const pricePlatilloRef = useRef('');
    const namePlatilloRef = useRef('');

    const [category, saveCategory] = useState('');
    const [error, saveError] = useState(false);

    const editProduct = async e => {
        e.preventDefault();

        // Validación
        const newPriceDishValue = pricePlatilloRef.current.value;
        const newNameDishValue = namePlatilloRef.current.value;

        if (newNameDishValue === '' || newPriceDishValue === '') {
            saveError(true);
            return;
        }

        saveError(false);

        // Revisar si cambio la categoria; de lo contrario asignar el mismo valor
        let categoriaPlatillo = category === '' ? product.categoria : category;

        // Obtener los valore del formulario
        const editDish = {
            precioPlatillo: newPriceDishValue,
            nombrePlatillo: newNameDishValue,
            categoria: categoriaPlatillo
        };

        // Send Request
        const URL = `http://localhost:4000/restaurant/${product.id}`;

        try {
            const result = await axios.put(URL, editDish);

            if (result.status === 200) {
                Swal.fire({
                    type: 'success',
                    title: 'Producto Editado',
                    text: 'El producto se editó correctamente.'
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelve a intentarlo.'
            });
        }

        // Redirigir al usuario
        saveRefreshProducts(true);
        history.push('/products');
    };

    /**
     * Read value from Radio Element
     * @param {*} e Radio element
     */
    const readRadioValue = e => {
        saveCategory(e.target.value);
    };

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>
            {error ? <Error message="Todos los campos son obligatorios." /> : null}
            <form onSubmit={editProduct} className="mt-5">
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        ref={namePlatilloRef}
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                        defaultValue={product.nombrePlatillo}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        ref={pricePlatilloRef}
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
                        defaultValue={product.precioPlatillo}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                    <div className="form-check form-check-inline">
                        <input
                            onChange={readRadioValue}
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="postre"
                            defaultChecked={product.categoria === 'postre'}
                        />
                        <label className="form-check-label">Postre</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            onChange={readRadioValue}
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="bebida"
                            defaultChecked={product.categoria === 'bebida'}
                        />
                        <label className="form-check-label">Bebida</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            onChange={readRadioValue}
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="cortes"
                            defaultChecked={product.categoria === 'cortes'}
                        />
                        <label className="form-check-label">Cortes</label>
                    </div>

                    <div className="form-check form-check-inline">
                        <input
                            onChange={readRadioValue}
                            className="form-check-input"
                            type="radio"
                            name="categoria"
                            value="ensalada"
                            defaultChecked={product.categoria === 'ensalada'}
                        />
                        <label className="form-check-label">Ensalada</label>
                    </div>
                </div>

                <input
                    type="submit"
                    className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
                    value="Editar Producto"
                />
            </form>
        </div>
    );
};

export default withRouter(EditProduct);
