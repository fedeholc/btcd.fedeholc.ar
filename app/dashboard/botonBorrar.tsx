//cspell:disable
"use client";

import dashboard from "./dashboard.module.css";
import handleBorrarComentario from "./borrar";
export default function BotonBorrar(props: { id: string }) {
  return (
    <button
      onClick={() => handleBorrarComentario({ id: props.id })}
      className={dashboard.comments__button}
    >
      Borrar
    </button>
  );
}
