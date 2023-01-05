import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import ConexionService from '../../services/ConexionService';
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import Icon from 'react-icons-kit';

const UpdateConexion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [conexion, setconexion] = useState({
        id: id,
        url: "",
        usuario: "",
        contraseña: "",
        schema: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setconexion({...conexion, [e.target.name]: value });
    };

    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await ConexionService.getConexionById(conexion.id);
            setconexion(response.data);
        } catch (error) {
            console.log(error);
        }
      };
      fetchData();
    }, [])
    
    const updateConexion = (e) => {
        e.preventDefault();
        ConexionService.updateConexion(conexion, id).then((response)=> {
            navigate("/conexionList");
        }).catch((error) => {
            console.log(error);
        });
    };

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

    const [type, setType]=useState('password');
    const [icon, setIcon]=useState(eyeOff);
    

  return (
    <div className='flex max-w-2xl mx-auto shadow'>
        <div className='px-8 py-8 bg-orange-50 background-color: oldlace;' >
            <div className='font-medium text-2xl tracking-wider text-gray-500'>
                <h1>Actualizar la Conexion</h1>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <div className='input-field'>
                    <label className='block text-gray-600 text-sm font-normal'>Url</label>
                    <input type='text' name="url" value={conexion.url} onChange={(e) => handleChange(e)} className='block text-gray-600 text-sm font-normal'></input>
                </div>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <div className='input-field'>
                    <label className='block text-gray-600 text-sm font-normal'>Esquema</label>
                    <input type='text' name="schema" value={conexion.schema} onChange={(e) => handleChange(e)} className='block text-gray-600 text-sm font-normal'></input>
                </div>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <div className='input-field'>
                    <label className='block text-gray-600 text-sm font-normal'>Usuario</label>
                    <input type='text' name='usuario' value={conexion.usuario} onChange={(e) => handleChange(e)} className='block text-gray-600 text-sm font-normal'></input>
                </div>
            </div>
            <div className='items-center justify-center h-14 w-full my-4'>
                <div className='input-field'>
                    <label className='block text-gray-600 text-sm font-normal'>Contraseña: </label>
                    <input type={type} password={true} secureTextEntry={true} name='contraseña' value={conexion.contraseña} onChange={(e) => handleChange(e)} className='block text-gray-600 text-sm font-normal'></input>
                    <span onClick={handleToggle}> <Icon icon={icon} size={25}/></span>
                </div>
            </div>
            <div className='items-center justify-center h-14 w-full my-4 space-x-4 pt-4'>
                <button onClick={updateConexion} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-2'>Actualizar</button>
                <button onClick={() => navigate("/conexionList")} className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-2'>Cancelar</button>
            </div>
        </div>
    </div>
  );
};

export default UpdateConexion