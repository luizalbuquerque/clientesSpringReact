import React, {useContext} from 'react';
import NavBarItem from './navBarItem';
import   AuthContext  from '../context/context';

function  NavBar (){
  const contexto =  useContext(AuthContext);
  const {isAutenticado,deslogar} =  contexto;

    return(
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary" >
        <div className="container">
          <a className="navbar-brand" href='#/home'>Crud Simples</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
            <NavBarItem render={isAutenticado} href="#/home"  label="Home"/>
            <NavBarItem render={isAutenticado} href="#/cadastro"  label="Cadastro"/>
            <NavBarItem render={isAutenticado} onClick={deslogar} href="#/"  label="sair"/>
          </ul>

          </div>
        </div>
      </div>

    );
}

export  default NavBar;