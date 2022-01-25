
import React from 'react';
import Card from "../components/Card";
import FormFroup from '../components/form-group';
import { withRouter } from "react-router-dom"
import UsuarioService from "../app/service/usuarioservice"
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import  AuthContext from "../context/context"
import {mostrarMensagemErro}  from "../components/toast"


class Login  extends React.Component {
   state ={ 
     email : "",
     senha : "",
   }

   constructor(){
     super();
     this.service = new UsuarioService();
   }
   
   validar(){
     let msg = [];
     if(!this.state.email){
        msg.push("Campo usuario obrigatório")
     }
     if(!this.state.senha){
      msg.push("Campo senha obrigatório")
    }
     return msg;
   }

   entra= () => {
    const msgs = this.validar();
    if(msgs && msgs.length > 0){
       msgs.forEach((msg) => {
         mostrarMensagemErro(msg)
       });
       return false;
    }

      axios.post('http://localhost:8080/usuario/autenticar',{
      username : this.state.email,
      password : this.state.senha
     }).then( resposta=>{
       let token  = resposta.data.token; 
          if(token){
            this.context.logar(jwtDecode(token),token);
            this.props.history.push("/home")     
         }   
     } ).catch(erro => {  
      if (!erro.status && !erro.response.data) {
        mostrarMensagemErro("Não estar havendo conexão")
    }
       mostrarMensagemErro(erro.response.data)
       console.log(erro.response.data);    
     })     


  }



  render(){

    return[
 
         <div className='row'>
             <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                    <div className='bs-docs-section'>
                       <Card  title = "Login">
                         <div className='row'>
                           <span> {this.state.msg}</span>
                         </div>
                         <div className='row'> 
                            <div className='col-lg-12'> 
                            <div className='bs-component'> 
                            <fieldset>          
                             <FormFroup label="Nome de usuario: * " htmlFor="exampleInputEmail1" >
                               <input type="userName" className='form-control' 
                               value={this.state.email}
                               onChange={e => this.setState({email: e.target.value})}
                                aria-describedby="emailHelp" placeholder="Digite o Usuario"
                                />
                               </FormFroup  >
                               <FormFroup label="Senha:  * " htmlFor="exampleInputPassword1" >
                               <input type="password" className='form-control' 
                                 value={this.state.senha}
                                 onChange={e => this.setState({senha: e.target.value})}
                               aria-describedby="emailHelp" placeholder="Digite a senha"/>
                               </FormFroup  >
                                 
                              <br></br>
                                 {/*     Esse bota~estar cadastrando o obejto usuario */}
                               <button onClick={this.entra} type="button" className="btn btn-success">Entrar</button>
                             
                              
                            </fieldset>
                         
                            </div>
                            </div>  
                         </div>

                       </Card>
        
                    </div>
                  </div>

           </div>
       
    ]
  }
}

Login.contextType = AuthContext;
export default  withRouter(Login);