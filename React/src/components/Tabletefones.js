
import React from 'react';
export default  (props) =>{
    const rows  =props.telefones.map ( (telefone, key) => {
     
        return(
            <tr   key={key} >     
                <td>{telefone.tipo}</td> 
                <td>{telefone.numero} </td>
                <td>    
                <button onClick={(e) => {props.deletarTelAction(telefone)}} type="button" className="btn btn-danger">excluir</button>
               </td>
            </tr>
        )
    })
    return(
        <table className="table table-hover">  
        <thead> 
           <tr> 
           <th scope="col"> Tipo </th>   
           <th scope="col"> Telefone</th>    
           </tr>
             
       </thead> 
       <tbody>
            {rows}   
       </tbody>
   
       </table>
      
    );
}

