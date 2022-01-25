import React from "react"
import InputMask from "react-input-mask";

export function TelefoneIpunt(props) {
    return(
        <div className="form-group">
        <label htmlFor={props.htmlFor}>{props.label}</label>
         < InputMask className="form-control" mask="(99) 9999-9999" onChange={props.onChange} value={props.value} />
      </div>
    ) 
  }
export function CelularInput(props) {
    return(
        <div className="form-group">
        <label htmlFor={props.htmlFor}>{props.label}</label>
         < InputMask className="form-control" mask="(99) 9 9999-9999" onChange={props.onChange} value={props.value} />
      </div>
    ) 
  }  
export function CpfInput(props) {
    return (
        <div className="form-group">
        <label htmlFor={props.htmlFor}>{props.label}</label>
         < InputMask className="form-control" mask="999.999.999-99" onChange={props.onChange} value={props.value} />
      </div>
    )
  }

  export function CepInput(props) {
    return(
        <div className="form-group">
        <label htmlFor={props.htmlFor}>{props.label}</label>
         < InputMask className="form-control" mask="99.999-999" onChange={props.onChange} value={props.value} />
      </div>
    ) 
  } 