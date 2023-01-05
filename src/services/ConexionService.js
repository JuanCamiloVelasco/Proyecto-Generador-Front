import axios from "axios";

const CONEXION_API_BASE_URL = "http://localhost:8080/conexiones"
const CONEXION_API_ORACLE = "http://localhost:8080/metadata"
const CONEXION_API_GENERATOR = "http://localhost:8080/metadataGen"
const CONEXION_API_RELACIONES = "http://localhost:8080/relaciones"


class ConexionService {
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

    getMetadata(url,schema,usuario,contraseña){
        return axios.get(CONEXION_API_ORACLE + "/" + url + "/" + schema + "/" +usuario + "/" + contraseña);
    }

    generarMetaColumnas(motor,url,schema,usuario,contraseña,tabla){
        return axios.get(CONEXION_API_GENERATOR + "/" + motor + "/" + url + "/" + schema + "/" +usuario + "/" + contraseña + "/" + tabla);
    }

    validarRelaciones(url,es ,usuario,contraseña, tabla, motor){
        return axios.get(CONEXION_API_RELACIONES + "/" + url + "/" + es + "/" + usuario + "/" + contraseña + "/" + tabla + "/" + motor );
    }
}

export default new ConexionService();