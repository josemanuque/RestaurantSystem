import axios from 'axios';

const PERSONA_API_BASE_URL = "http://201.237.205.229:11615/api/v1/personas";

class PersonasService {

    getPersonas() {
        return axios.get(PERSONA_API_BASE_URL);
    }

    createPersona(persona) {
        return axios.post(PERSONA_API_BASE_URL, persona);
    }

    getPersonaById(personaId) {
        console.log(personaId);
        return axios.get(PERSONA_API_BASE_URL + '/' + personaId);
    }

    updatePersona(persona, personaId) {
        return axios.put(PERSONA_API_BASE_URL + '/' + personaId, persona);
    }

    deletePersona(personaId) {
        return axios.delete(PERSONA_API_BASE_URL + '/' + personaId);
    }
}

export default new PersonasService()