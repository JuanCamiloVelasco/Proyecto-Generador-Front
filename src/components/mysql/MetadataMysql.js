import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import ConexionServicePost from '../../services/ConexionServiceMysql';

const Metadata = () => {
    const [loading, setLoading] = useState(true);
    const [conexiones, setConexiones] = useState(null);
    const { id } = useParams();
    const { host } = useParams();
    const { user } = useParams();
    const { password } = useParams();
    const [conexion, setconexion] = useState({
        id: id,
        url: host,
        usuario: user,
        contraseña: password,
    });

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
              const response = await ConexionServicePost.getMetaColumnas();
              setConexiones(response.data);
              
          } catch (error) {
              console.log(error);
              console.log(conexion.url);
              console.log(conexion.usuario);
              console.log(conexion.contraseña);
          }
          setLoading(false);
        };
        fetchData();
    }, []);
    
  return (
    
    <div className='container mx-auto my-8'>
        <div className='flex shadow border-b'>
            <table className='min-w-full'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Tablas</th>
                        <th className='text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Acciones</th>
                    </tr>
                </thead>
                {!loading && ( 
                    <tbody className='bg-white'>
                        {conexiones.map((conexion) => (
                        <tr>
                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>{conexion}</div>
                    </td>
                    <td className='text-right px-6 py-4 whitespace-nowrap font-medium text-sm'>
                        {/* <a onClick={(e, conexion) => metadata(e, conexion)} className='text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer'>Detalles</a> */}
                    </td>
                </tr>
                ))}
                    </tbody>
                )}
            </table>
        </div>
    </div>
  )
}

export default Metadata