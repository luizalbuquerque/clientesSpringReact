import React from 'react';
export default  (props) =>{

    const cep =function (cliente){
        if (cliente.endereco !== null) {
             const {cep} = cliente.endereco
               return cep;
             }  
              return "";  
    }
    const localidade =function (cliente){
        if (cliente.endereco !== null) {
       
             const {localidade} = cliente.endereco
     
               return localidade;
             }  
              return "";  
    }
    const rows  =props.clientes.map ( (cliente, index) => {
       cep(cliente)
        return(
            <tr key={index} >       
                <td>{cliente.nome} </td>
                <td>{cliente.cpf}</td> 
                <td>{cep(cliente) }</td> 
                <td>{localidade(cliente) }</td> 
                <td>        
                <button  onClick={(e) => {props.editarAction(cliente.id)}} type="button" className="btn btn-success">Editar</button>
                <button onClick={(e) => {props.infoAction(cliente)}} type="button" className="btn btn-info">info</button>
                <button onClick={(e) => {props.deletarAction(cliente)}} type="button" className="btn btn-danger">excluir</button>
                 </td>                           
            </tr>
        )
    })
    return(
        <table className="table table-hover">  
        <thead> 
           <tr> 
           <th scope="col"> Nome</th>
            <th scope="col"> Cpf </th>   
            <th scope="col">CEP </th>   
            <th scope="col">Cidade </th>   
            <th scope="col">Açoes </th>   
           </tr>
             
       </thead> 
       <tbody>
            {rows}   
       </tbody>
   
       </table>
      
    );
}

