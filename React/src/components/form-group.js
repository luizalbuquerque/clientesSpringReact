import React from 'react';


function FormFroup( props){
         return(
            <div className="form-group">
           <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
         </div>
  )
}

export default FormFroup;