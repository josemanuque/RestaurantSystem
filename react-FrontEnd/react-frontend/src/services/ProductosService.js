import axios from 'axios';

const PRODUCTO_API_BASE_URL = "http://201.237.205.229:11615/api/v1/productos";

class ProductosService {

    getProductos() {
        console.log("HOLA");
        return axios.get(PRODUCTO_API_BASE_URL);
    }

    createProducto(producto) {
        return axios.post(PRODUCTO_API_BASE_URL, producto);
    }

    getProductoById(productoId) {
        console.log(productoId);
        return axios.get(PRODUCTO_API_BASE_URL + '/' + productoId);
    }

    updateProducto(producto, productoId) {
        return axios.put(PRODUCTO_API_BASE_URL + '/' + productoId, producto);
    }

    deleteProducto(productoId) {
        return axios.delete(PRODUCTO_API_BASE_URL + '/' + productoId);
    }
}

export default new ProductosService()