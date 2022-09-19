import axios from 'axios';

const PERSONA_API_BASE_URL = "http://201.237.205.229:11615/api/v1/personas";

class PersonasService {

    getPersonas() {
        return axios.get(PERSONA_API_BASE_URL);
    }
}

export default new PersonasService()