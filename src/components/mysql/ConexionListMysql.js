import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ConexionServiceMysql from '../../services/ConexionServiceMysql';
import Conexion from './ConexionMysql';

const ConexionList = () => {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [conexionespost, setConexionespost] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
            const response = await ConexionServiceMysql.getConexiones();
            setConexionespost(response.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    }, []);

    const deleteConexion = (e, id) => {
        e.preventDefault();
        ConexionServiceMysql.deleteConexion(id).then((res) => {
            if(conexionespost) {
                setConexionespost((prevElement) => {
                    return prevElement.filter((conexion) => conexion.id !== id)
                });
            }
        });
    };
    
  return (
    <div className="">
    <div className="h-16 px-8 flex items-center bg-gray-800" >
      <p className="text-white font-bold">Sistema de Conexiones Mysql</p>
    </div>
    <div className='container mx-auto my-8'>
        <div className='h-12'>
            <button onClick={() => navigate("/addConexionMysql")} className='rounded bg-slate-600 text-white px-6 py-2 font-semibold'>Añadir Conexion</button>
        </div>
        <div className='flex shadow border-b'>
            <table className='min-w-full'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Host</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Usuario</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Contraseña</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Esquema</th>
                        <th className='text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Acciones</th>
                    </tr>
                </thead>
                {!loading && ( 
                    <tbody className='bg-white'>
                        {conexionespost.map((conexion) => (
                            <Conexion conexion={conexion} deleteConexion={deleteConexion} key={conexion.id}></Conexion>
                        ))}
                    </tbody>
                )}
            </table>
        </div>
    </div>
    </div>
  )
}

export default ConexionList