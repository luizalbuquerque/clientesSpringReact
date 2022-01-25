
import React from 'react';
export default  (props) =>{
    const rows  =props.emails.map ( (email,index) => {

        return(
            <tr key={index} >       
                <td>{email.nome}</td> 
                <td>        
                <button  onClick={() => {props.deletarAction(email)}} type="button" class="btn btn-danger">deletar</button>
                </td>             
            </tr>
        )
    })
    return(
        <table className="table table-hover">  
        <thead> 
           <tr> 
           <th scope="col"> Email </th>    
           </tr>       
       </thead> 
       <tbody>
            {rows}   
       </tbody>
   
       </table>
      
    );
}

