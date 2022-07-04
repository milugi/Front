import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';

function prueba() {

    const datos = {nombreyapellido: "Pedro Fister" , correo: 'pedro.fister@hotmail.com',  id_rol: 11} 

    console.log(datos)

    const direccionCarrito = async (e) => {
        e.preventDefault();
        if (datos.id_rol == 10) {
            console.log('es usuario')
            (window.location.href = `https://front-three-gold.vercel.app//carrito?carrito=${datos.correo}`)
        } else {
            console.log('es admin y el boton no funciona')
        }
    };

    const botonHome = async (e) => {
        e.preventDefault();
        if (datos.id_rol == 11){
            console.log('bien')
            (window.location.href = `https://front-three-gold.vercel.app//homeadmin/${datos.correo}`)
        }   else {
            console.log('va para home nomas')
            (window.location.href = `https://front-three-gold.vercel.app//home/${datos.correo}`)
        }
    };

    return(
        <>
            <div>
                <form onSubmit={direccionCarrito}>
                    <Button type='submit' className="carr"   >
                        <ion-icon name="cart" ></ion-icon>
                    </Button>
                </form>
                <form onSubmit={botonHome}>
                    <Button type='submit' className="cass">
                        <ion-icon name="home"></ion-icon>
                    </Button>
                </form>
            </div>
        </>
    )
}

export default prueba;
