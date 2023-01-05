import { Form } from "semantic-ui-react";
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ConexionServiceMysql from '../../services/ConexionServiceMysql';
import swal from 'sweetalert';

const GetMetadata = () => {
    const [i, setI]=useState(0);
    const [val, setVal]=useState(0);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [conexiones, setConexiones] = useState(null);
    const [validar, setValidar] = useState([]);
    const [pjl2, setPjl2] = useState([]);
    const [pjl, setPjl] = useState([]);
    const { id } = useParams();
    const { url } = useParams();
    const { user } = useParams();
    const { password } = useParams();
    const { schema } = useParams();
    const [conexion] = useState({
        id: id,
        url: url,
        usuario: user,
        contraseña: password,
        schema: schema
    });

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
              const response = await ConexionServiceMysql.getMetadata(conexion.url , conexion.schema, conexion.usuario, conexion.contraseña );
              setConexiones(response.data);
              
          } catch (error) {
              console.log(error);
              console.log(conexion.url);
              console.log(conexion.usuario);
              console.log(conexion.contraseña);
              console.log(conexion.schema);
          }
          setLoading(false);
        };
        fetchData();
    }, []);


    const getPjl = (e) => {
        const { value, checked } = e.target
        console.log(`${value} is ${checked}`)
        if(checked){
            setPjl([...pjl, value])
        } else {
            setPjl(pjl.filter((e) => e !== value))
        }
    }

    const generate = (e, a) => {
        e.preventDefault();
        if (pjl===""){
            alert("Seleccione una tabla para generar el codigo");
            return;
        }
        pjl.forEach( (a) => {
            ConexionServiceMysql.generarMetaColumnas("mysql", url , schema, conexion.usuario, conexion.contraseña, a);
            const relacion = ConexionServiceMysql.validarRelaciones(url , schema , conexion.usuario, conexion.contraseña, a, "mysql");
            relacion.then(response => { setValidar(response.data)})
            relacion.then(response => { setPjl2([...pjl2, response.data])})
        });
        setShow(true);
        swal({
            title: "Todo bien",
            text: "El codigo ha sido generado exitosamente",
            icon: "success",
            button: "aceptar"
        })
    };

    const generateRelaciones = (e, a) => {
        pjl.forEach( (a) => {
            const relacion = ConexionServiceMysql.validarRelaciones(url , schema , conexion.usuario, conexion.contraseña, a, "mysql");
            relacion.then(response => { setValidar(response.data)})
            relacion.then(response => { setPjl2([...pjl2, response.data])})
        });
        if (validar===true || val===1 || i===1){
            swal({
                title: "Atencion",
                text: "Hay relaciones existentes, quiere generarlas?",
                icon: "warning",
                buttons: ["Denegar", "Aceptar"]
            }).then(respuesta => {
                if(respuesta){
                    pjl.forEach( (a) => {
                        ConexionServiceMysql.generarMetaColumnas("mysql", url , schema, conexion.usuario, conexion.contraseña, a);
                    });
                    swal({text: "Las relaciones fueron generadas exitosamente", 
                    icon: "success"})
                } else {
                    swal({text: "El codigo no fue modificado", 
                    icon: "error"})
                }
            })
            setI(2);
        pjl2.forEach( (a) => {
            if(a===true){
                setVal(1);
            }
        });
        } else {
            swal({
                title: "Atencion",
                text: "No hay relaciones disponibles",
                icon: "error",
                buttons: "aceptar"
            })
        }
    };

    console.log(validar)
    const mensaje = () => {
        if(i===0){
            swal({
                title: "Atencion",
                text: "Hay relaciones existentes, quiere generarlas?",
                icon: "warning",
                buttons: ["Denegar", "Aceptar"]
            }).then(respuesta => {
                if(respuesta){
                    pjl.forEach( (a) => {
                        ConexionServiceMysql.generarMetaColumnas("mysql", url , schema, conexion.usuario, conexion.contraseña, a);
                    });
                    swal({text: "Las relaciones fueron generadas exitosamente", 
                    icon: "success"})
                }
            })
            setI(1);
            console.log(i);
        }
    }

    if (validar===true){
        try {
            mensaje();
        } catch (error) {
            console.log("no pasa na")
        }
       
    }
    
  return (
    <div className='container mx-auto my-8'>
        <div className='h-12'>
            <button onClick={() => navigate("/ConexionListMysql")} className='rounded bg-slate-600 text-white px-6 py-2 font-semibold'>Atras</button>
        </div>
            <button onClick={(e, pjl) => generate(e, pjl)}  className='rounded bg-green-500 text-white px-6 py-2 font-semibold'>Generar Codigo</button>       
            {
                show? <button onClick={(e, pjl) => generateRelaciones(e, pjl)} className='rounded bg-green-500 text-white px-6 py-2 font-semibold m-4'>Validar relaciones</button>:null
            }
        <div className='flex shadow border-b'>
            <table className='table table-stiped table-bordered  min-w-full'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Tablas</th>
                        <th className='text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Acciones</th>
                    </tr>
                </thead>
                {!loading && ( 
                    <tbody className='bg-white'>
                    {conexiones.map((conexionTablas) => (
                        <tr>
                    <td className='text-left px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>{conexionTablas}</div>
                    </td>
                    
                    <td className='text-right px-6 py-4 whitespace-nowrap font-medium text-sm'>
                    <Form>
                        <Form.Checkbox value={conexionTablas} onChange={(e) => getPjl(e)} label=" Generar codigo? "/>
                    </Form>     
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

export default GetMetadata
