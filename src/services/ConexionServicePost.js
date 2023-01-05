import axios from "axios";

const CONEXION_API_BASE_URL = "http://localhost:8080/conexionespost"
const CONEXION_API_POSTGRES = "http://localhost:8080/metadatapost"
const CONEXION_API_GENERATOR = "http://localhost:8080/metadataGenpost"
const CONEXION_API_RELACIONES = "http://localhost:8080/relacionespost"


class ConexionServicePost {
    saveConexion(conexion){
        return axios.post(CONEXION_API_BASE_URL, conexion);
    }

    getConexiones(){
        return axios.get(CONEXION_API_BASE_URL);
    }

    deleteConexion(id){
        return axios.delete(CONEXION_API_BASE_URL + "/" + id);
    }

    getConexionById(id){
        return axios.get(CONEXION_API_BASE_URL + "/" + id);
    }

    updateConexion(conexion, id){
        return axios.put(CONEXION_API_BASE_URL + "/" + id, conexion);
    }

    getMetadata(url,es,usuario,contraseña){
        return axios.get(CONEXION_API_POSTGRES + "/" + url + "/" + es + "/" +usuario + "/" + contraseña);
    }

    generarMetaColumnas(motor,url,es,usuario,contraseña,tabla){
        return axios.get(CONEXION_API_GENERATOR + "/" + motor + "/" + url + "/" + es + "/" +usuario + "/" + contraseña + "/" + tabla);
    }

    validarRelaciones(url,es ,usuario,contraseña, tabla, motor){
        return axios.get(CONEXION_API_RELACIONES + "/" + url + "/" + es + "/" + usuario + "/" + contraseña + "/" + tabla + "/" + motor );
    }
}

export default new ConexionServicePost();