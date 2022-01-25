import React ,{ useContext} from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom'
import Login from "../views/Login"
import Cadastro from "../views/cadastrocliente"
import Home from "../views/home"
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import  AuthContext  from '../context//context';
import BemVindo from '../views/boasVindas';



function RotaAutenticada({component: Component,isUsuarioAutenticado,  ...props}){
    return(
        <Route  {...props} render={(componentProps=>{
            if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps}/>
                )
            }else{
              return (
                  <Redirect to={{pathname:"/login", state: { from : componentProps.location}}}/>
              )  
            }
        })}/>
    )
}

function Rotas(){
 const contexto =  useContext(AuthContext);
 const {isAutenticado} =  contexto;
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={BemVindo}/> 
                <Route path="/login" component={Login}/> 
                <RotaAutenticada isUsuarioAutenticado={isAutenticado}  path="/cadastro/:id?" component={Cadastro}/> 
                <RotaAutenticada isUsuarioAutenticado={isAutenticado} path="/home" component={Home}/>          
            </Switch>
        </HashRouter>
    )
}

export default Rotas;