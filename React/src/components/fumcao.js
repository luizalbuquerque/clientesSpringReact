
import React, {useContext} from "react";
import AuthContext from "../context/context";
function  Filha (){
    const contexto =  useContext(AuthContext);
    const {  isAutenticado, deslogar } = contexto
      return(
        <div>
        {isAutenticado? <button onClick={deslogar}> Deslogar</button>:
        <h2> menu sendo mostardo </h2>  }
        <h2> user : </h2>
        <h2 > Autenticado : {isAutenticado ? "Autenticado" : "Deslogado"}  </h2>
        <button onClick={deslogar}> Deslogar</button>
      </div>
      );
  }
  
  export  default Filha;