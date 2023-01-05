import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {eyeOff} from 'react-icons-kit/feather/eyeOff'
import {eye} from 'react-icons-kit/feather/eye'
import Icon from 'react-icons-kit';

const Conexion = ( {conexion, deleteConexion} ) => {

    const navigate = useNavigate();

    const editConexion = (e, id) => {
        e.preventDefault();
        navigate(`/editConexion/${id}`);
    };

    const metadata = (e, url, schema, usuario, contraseña) => {
        e.preventDefault();
        navigate(`/getMeta/${url}/${schema}/${usuario}/${contraseña}`);
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
    <tr key={conexion.id}>
        <td className='text-left px-6 py-4 whitespace-nowrap'>
            <div className='text-sm text-gray-500'>{conexion.url}</div>
        </td>
        <td className='text-left px-6 py-4 whitespace-nowrap'>
            <div className='text-sm text-gray-500'>{conexion.usuario}</div>
        </td>
        <td className='text-left px-6 py-4 whitespace-nowrap'>
            <div className='text-sm text-gray-500'> 
                <div className='span'>
                <input type={type} password={true} secureTextEntry={true} name='contraseña' value={conexion.contraseña} display= 'none' />
                    <span onClick={handleToggle}><Icon icon={icon} size={25}/></span> 
                </div>
            </div>
        </td>
        <td className='text-left px-6 py-4 whitespace-nowrap'>
            <div className='text-sm text-gray-500'>{conexion.schema}</div>
        </td>
        <td className='text-right px-6 py-4 whitespace-nowrap font-medium text-sm'>
            <a onClick={(e, id) => editConexion(e, conexion.id)} className='text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer'>Editar</a>
            <a onClick={(e, url, schema, usuario, contraseña) => metadata(e, conexion.url, conexion.schema, conexion.usuario, conexion.contraseña)} className='text-purple-500 hover:text-indigo-800 px-4 hover:cursor-pointer'>MetaData</a>
            <a onClick={(e, id) => deleteConexion(e, conexion.id)} className='text-red-500 hover:text-indigo-800 hover:cursor-pointer'>Eliminar</a>
        </td>
    </tr>
  )
}

export default Conexion