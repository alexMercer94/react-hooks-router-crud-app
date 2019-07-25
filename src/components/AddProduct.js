import React, { useState } from 'react';
import Error from './Error';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

const AddProduct = ({ history, saveRefreshProducts }) => {
    const [namePlatillo, saveName] = useState('');
    const [pricePlatillo, savePrice] = useState('');
    const [category, saveCategory] = useState('');
    const [error, saveError] = useState(false);

    /**
     * Read value from Radio Element
     * @param {*} e Radio element
     */
    const readRadioValue = e => {
        saveCategory(e.target.value);
    };

    /**
     * Add a product to state
     * @param {*} e HTML Element
     */
    const addProduct = async e => {
        e.preventDefault();

        // Validar que los valores de los campos no esten vacios
        if (namePlatillo === '' || pricePlatillo === '' || category === '') {
            saveError(true);
            return;
        }

        saveError(false);

        // Crear el nuevo producto
        try {
            const result = await axios.post('http://localhost:4000/restaurant', {
                nombrePlatillo: namePlatillo,
                precioPlatillo: pricePlatillo,
                categoria: category
            });

            if (result.status === 201) {
                Swal.fire({
                    type: 'success',
                    title: 'Producto Creado',
                    text: 'El producto se creo correctamente.'
                });
            }
        } catch (error) {
            console.log(`Error: ${error}`);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelve a intentarlo.'
            });
        }

        // Redirigi al usuario a productos
        saveRefreshProducts(true);
        history.push('/products');
    };

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>
            {error ? <Error message="Todos los campos son obligatorios." /> : null}
            <form onSubmit={addProduct} className="mt-5">
                <div className="form-group">
                    <label>Nombre Platillo</label>
                    <input
                        onChange={e => saveName(e.target.value)}
                        type="text"
                        className="form-control"
                        name="nombre"
                        placeholder="Nombre Platillo"
                    />
                </div>

                <div className="form-group">
                    <label>Precio Platillo</label>
                    <input
                        onChange={e => savePrice(e.target.value)}
                        type="number"
                        className="form-control"
                        name="precio"
                        placeholder="Precio Platillo"
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
                        />
                        <label className="form-check-label">Ensalada</label>
                    </div>
                </div>

                <input
                    type="submit"
                    className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3"
                    value="Agregar Producto"
                />
            </form>
        </div>
    );
};

export default withRouter(AddProduct);
