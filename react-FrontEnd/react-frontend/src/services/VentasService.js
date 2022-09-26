import axios from 'axios';

const VENTA_API_BASE_URL = "http://201.237.205.229:11615/api/v1/ventas";

class VentasService {

    getVentas() {
        return axios.get(VENTA_API_BASE_URL);
    }

    createVenta(venta) {
        return axios.post(VENTA_API_BASE_URL, venta);
    }

    createVentaProducto(ventaProducto) {
        return axios.post("http://201.237.205.229:11615/api/v1/ventaProducto", ventaProducto);
    }

    getVentaById(ventaId) {
        console.log(ventaId);
        return axios.get(VENTA_API_BASE_URL + '/' + ventaId);
    }

    getVentaProductoByIdVenta(ventaId) {
        console.log(ventaId);
        return axios.get("http://201.237.205.229:11615/api/v1/ventaProducto/" + ventaId);
    }

    updateVenta(venta, ventaId) {
        return axios.put(VENTA_API_BASE_URL + '/' + ventaId, venta);
    }

    deleteVenta(ventaId) {
        return axios.delete(VENTA_API_BASE_URL + '/' + ventaId);
    }
}

export default new VentasService()