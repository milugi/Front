import React, { useState, useEffect } from "react";
import "../hojas-de-estilo/BloqueCarrito.css";
import { createPayment } from "../services/mercado.service";
import {Button} from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

function BloqueCarrito() {
  const [librosCarrito, setlibrosCarrito] = useState(0);
  useEffect(() => {
    const datosLibros = JSON.parse(localStorage.getItem("carrito"));

    setlibrosCarrito([...datosLibros]);
  }, []);

  const borrarDeCarrito = (id) => {
    console.log("Borrando");
    const datosLibros = JSON.parse(localStorage.getItem("carrito"));
    const librosBuscado = datosLibros.filter((item) => item.id_ejemplar !== id);
    localStorage.setItem("carrito", JSON.stringify(librosBuscado));
    setlibrosCarrito([...librosBuscado]);
  };

  const Comprar = (cantidad, precioTotal) => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let Email = params.get("carrito");
    createPayment(Email, cantidad, precioTotal)
      .then((res) => (window.location.href = res.init_point))
      .catch(console.error);
  };

  return (
    <div className="item-carrito-container">
      <div className="flex-car">
        {librosCarrito.length > 0 ? (
          librosCarrito.map((libros, i) => (
            <div key={i} className="item-carrito">
              <img src={libros.img}></img>
              <div>
                <p>{libros.titulo} </p>
                <p>Autor : {libros.autor} </p>
                <p>Precio : $ {libros.precioactual}</p>
                <p>Cantidad : {libros.cantidadEnCarrito}</p>
                <Button
                  onClick={() => borrarDeCarrito(libros.id_ejemplar)}
                  variant="contained"
                  sx={{
                    backgroundColor: "#8381FF",
                    borderRadius: 25,
                    margin: 0.8,
                    fontFamily: "Roboto",
                  }}
                >
                  <RemoveShoppingCartIcon />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="center-fail">
            <h2>No agregaste al carrito </h2>
          </div>
        )}
      </div>

      <div className="car-total">
        <p>
          Total:{" $ "}
          {librosCarrito.length
            ? librosCarrito.reduce(
                (previousValue, currentValue) =>
                  previousValue +
                  currentValue.precioactual * currentValue.cantidadEnCarrito,
                0
              )
            : "0"}
        </p>
        <p>
          Cantidad de Libros:{" "}
          {librosCarrito.length
            ? librosCarrito.reduce(
                (previousValue, currentValue) =>
                  previousValue + currentValue.cantidadEnCarrito,
                0
              )
            : "0"}
        </p>
        <button
          className="btn btn-primary btn-block"
          onClick={() =>
            Comprar(
              librosCarrito.length
                ? librosCarrito.reduce(
                    (previousValue, currentValue) =>
                      previousValue +
                      currentValue.precioactual *
                        currentValue.cantidadEnCarrito,
                    0
                  )
                : 0,

              1
            )
          }
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
}

export default BloqueCarrito;
