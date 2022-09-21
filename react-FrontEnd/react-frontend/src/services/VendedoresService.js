import axios from 'axios';

const VENDEDOR_API_BASE_URL = "http://201.237.205.229:11615/api/v1/vendedores";

class VendedoresService {

    getVendedores() {
        return axios.get(VENDEDOR_API_BASE_URL);
    }

    createVendedor(vendedor) {
        return axios.post(VENDEDOR_API_BASE_URL, vendedor);
    }

    getVendedorById(vendedorId) {
        return axios.get(VENDEDOR_API_BASE_URL + '/' + vendedorId);
    }

    updateVendedor(vendedor, vendedorId) {
        return axios.put(VENDEDOR_API_BASE_URL + '/' + vendedorId, vendedor);
    }

    deleteVendedor(vendedorId) {
        return axios.delete(VENDEDOR_API_BASE_URL + '/' + vendedorId);
    }
}

export default new VendedoresService()