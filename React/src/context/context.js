import React from "react";
import AuthService from "../../src/app/service/AuthService";

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProviderr extends  React.Component{
    state ={
       usuarioAutenticado : null,
       isAutenticado : false,
       token :""
       

    }

    componentDidMount(){ 
      const is = AuthService.isUsuarioAutenticado();
      if(is>0){
        this.setState({ usuarioAutenticado: AuthService.obterUsuarioAutentcado, isAutenticado:true});
      }
    
    }

    logar =(usuario, token)=> {
      this.setState({usuarioAutenticado: usuario, token : token, isAutenticado:true})
      AuthService.logar(usuario);
    }

    deslogar =()=> {
        this.setState({usuarioAutenticado:null, isAutenticado:false})
        AuthService.removerUsuarioAutenticado();
      }

    render(){

        const { usuarioAutenticado , isAutenticado, token} = this.state;
        const{logar,deslogar} = this;

        return(
          <AuthContext.Provider value={{usuarioAutenticado , isAutenticado,  token, logar, deslogar}}>
             {this.props.children}
          </AuthContext.Provider>
        )
    }


}

export default AuthContext