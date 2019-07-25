import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import EditProduct from './components/EditProduct';
import Product from './components/Product';
import Header from './components/Header';
import axios from 'axios';

function App() {
    const [products, saveProducts] = useState([]);
    const [refreshProducts, saveRefreshProducts] = useState(true);

    useEffect(() => {
        if (refreshProducts) {
            const fetchApi = async () => {
                const result = await axios.get('http://localhost:4000/restaurant');
                saveProducts(result.data);
            };

            fetchApi();
        }

        // Cambiar a false la recarga de los productos
        saveRefreshProducts(false);
    }, [refreshProducts]);

    return (
        <Router>
            <Header />
            <main className="container mt-5">
                <Switch>
                    <Route
                        exact
                        path="/products"
                        render={() => <Products products={products} saveRefreshProducts={saveRefreshProducts} />}
                    />
                    <Route
                        exact
                        path="/new-product"
                        render={() => <AddProduct saveRefreshProducts={saveRefreshProducts} />}
                    />
                    <Route exact path="/products/:id" component={Product} />
                    <Route
                        exact
                        path="/products/edit/:id"
                        render={props => {
                            // Tomar el ID del producto
                            const idProduct = parseInt(props.match.params.id);

                            // El producto que se pasa al State
                            const product = products.filter(producto => producto.id === idProduct);

                            return <EditProduct product={product[0]} saveRefreshProducts={saveRefreshProducts} />;
                        }}
                    />
                </Switch>
            </main>
            <p className="mt-4 p2 text-center">Todos los derechos reservados.</p>
        </Router>
    );
}

export default App;
