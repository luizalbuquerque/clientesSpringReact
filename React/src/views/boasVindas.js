import React from "react";
import { withRouter } from "react-router-dom";
class CadastroCliente extends React.Component {


    goLogin = () => {
        this.props.history.push("/login")     
    }

    render() {
 
       return (
        
         <button  onClick={this.goLogin}     className=" btn btn-success"  > Acessar o sistema</button>
       )
    }
 
 
 }
 
 export default withRouter(CadastroCliente);