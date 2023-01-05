import React, { useState } from 'react'
import ConexionService from '../../services/ConexionService';
import { useNavigate } from "react-router-dom";
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import Icon from 'react-icons-kit';

const AddConexion = () => {

    const [conexion, setconexion] = useState({
        id: "",
        url: "",
        usuario: "",
        contraseña: "",
        schema: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setconexion({...conexion, [e.target.name]: value });
    };

    const saveConexion = (e) => {
        e.preventDefault();
        ConexionService.saveConexion(conexion)
        .then((response) => {
            console.log(response);
            navigate("/conexionList");
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const reset = (e) => {
        e.preventDefault();
        setconexion({
            id: "",
            url: "",
            usuario: "",
            contraseña: ""
        });
    }

    const handleToggle=()=>{    
        if(type==='password'){
          setIcon(eye);      
          setType('text');
        }
        else{
          setIcon(eyeOff);     
          setType('password');
        }
    }

    const [isSecureEntry, setIsSecureEntry] = useState(true);

    const [type, setType]=useState('password');
    const [icon, setIcon]=useState(eyeOff);

  return (
    <div className='flex max-w-2xl mx-auto shadow border-b'>
        <div className='px-8 py-8 bg-orange-50 background-color: oldlace;'>
            <div className='font-medium text-2xl tracking-wider text-gray-500'>
                <h1>Añadir Nueva Conexion Oracle</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <div className='input-field '>
                    <label className='block text-gray-600 text-sm font-normal'>Host</label>
                    <input type='text' name="url" value={conexion.url} onChange={(e) => handleChange(e)} className='h-10 w-96 border mt-2 px-2 py2'></input>
                </div>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <div className='input-field '>
                    <label className='block text-gray-600 text-sm font-normal'>Esquema</label>
                    <input type='text' name="schema" value={conexion.schema} onChange={(e) => handleChange(e)} className='h-10 w-96 border mt-2 px-2 py2'></input>
                </div>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <div className='input-field '>
                    <label className='block text-gray-600 text-sm font-normal'>Usuario</label>
                    <input type='text' name='usuario' value={conexion.usuario} onChange={(e) => handleChange(e)} className='h-10 w-96 border mt-2 px-2 py2'></input>
                </div>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <div className='input-field '>
                    <label className='block text-gray-600 text-sm font-normal'>Contraseña: </label>
                    <input type={type} password={true} secureTextEntry={true} name='contraseña' value={conexion.contraseña} onChange={(e) => handleChange(e)} className='block text-gray-600 text-sm font-normal'></input>
                    <span onClick={handleToggle}> <Icon icon={icon} size={25}/></span>
                </div>
            </div>
            <div className='items-center justify-center h-14 w-full my-4 space-x-4 pt-4'>
                <button onClick={saveConexion} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-2'>Guardar</button>
                <button onClick={reset} className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-2'>Limpiar</button>
                <button onClick={() => navigate("/conexionList")} className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-2'>Cancelar</button>
            </div>
        </div>
    </div>
  )
}

export default AddConexion