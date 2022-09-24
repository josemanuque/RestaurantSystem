import axios from 'axios';

const CLIENTE_API_BASE_URL = "http://201.237.205.229:11615/api/v1/clientes";

class VendedoresService {

    getClientes() {
        return axios.get(CLIENTE_API_BASE_URL);
    }

    createCliente(cliente) {
        return axios.post(CLIENTE_API_BASE_URL, cliente);
    }

    getClienteById(clienteId) {
        return axios.get(CLIENTE_API_BASE_URL + '/' + clienteId);
    }

    updateCliente(cliente, clienteId) {
        return axios.put(CLIENTE_API_BASE_URL + '/' + clienteId, cliente);
    }

    deleteCliente(clienteId) {
        return axios.delete(CLIENTE_API_BASE_URL + '/' + clienteId);
    }
}

export default new VendedoresService()