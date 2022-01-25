import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";
import ClientesTable from "./clientesTable";
import AuthContext from "../context/context"
import { Dialog } from 'primereact/dialog';
import { mostrarMensagemAlerta, mostrarMensagemSucesso, mostrarMensagemErro } from "../components/toast"

const baseURL = "http://localhost:8080/cliente/"


class Home extends React.Component {

  state = {
    table: [],
    mostraInfo: false,
    nome: "",
    cpf: "",
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    endereco: null,
    tableTelefones: [],
    tableEmails: [],
  }


  componentDidMount() {
    const JWTToken = this.context.token;
    axios.get(`${baseURL}`, { headers: { "Authorization": `Bearer ${JWTToken}` } })
      .then(response => {
        this.setState({ table: response.data })
      })
      .catch(erro => {
        console.log(erro.response.data)
      })

  }

  buscar = () => {


    axios.get(`${baseURL}/`)
      .then(response => {

        this.setState({ table: response.data })
      })
      .catch(erro => {
        console.log(erro.response.data)
      })

  }
  deletar = (client) => {
    axios
      .delete(`${baseURL} ${client.id}`, { headers: { "Authorization": `Bearer ${this.context.token}` } })
      .then((respposta) => {
        const table = this.state.table
        const index = table.indexOf(client)
        table.splice(index, 1)
        this.setState(table)
        mostrarMensagemSucesso(respposta.data)
      }).catch(function (err) {
        mostrarMensagemAlerta(err.response.data.erro)
      }

      )
  }


  editar = (id) => {
    //  this.props.parans = id;
    this.props.history.push(`/cadastro/${id}`)
  }

  info = (cliente) => {
    //  this.props.parans = id;
    this.setState({mostraInfo:true})
    const{nome, cpf, endereco, telefones, emails} = cliente;
    const {cep, logradouro, complemento, bairro, localidade, uf} = endereco;
    this.setState({nome, cpf,cep, logradouro, complemento , bairro, localidade,uf})
    this.setState({tableTelefones: telefones})
    this.setState({ tableEmails: emails, tableTelefones:telefones })
  }

/**
 * 
 * @returns     {this.state.tableTelefones.map( (email) => {
                  return  <a> {email}</a>
                 }) }
 */


  render() {

    return (

      <div className="jumbotron">
        <h2 className="display-3">Bem vindo!</h2>
        <h4 className="display-5">Clientes cadastrado no sistema </h4>
        <hr className="my-4" />
        <p>E essa é sua área administrativa, utilize um dos menus ou botões para efetuar as açõies no sistema.</p>

        <div className="row">
          <div className="col-md-12"> </div>
          <div className="bs-component">
            <ClientesTable clientes={this.state.table}
              editarAction={this.editar}
              infoAction={this.info}
              deletarAction={this.deletar}

            />
          </div>
        </div>
        <div className="row">
          <Dialog header="Informação do cliente" 
           visible={this.state.mostraInfo}
            style={{ width: '50vw' }}
            modal={true}
            onHide={() => this.setState({mostraInfo:false})}>
             <div  className="row">
               <span> Nome do cliente : 
                 <a> {this.state.nome}</a>
               </span>
               <span> Cpf : 
                 <a> {this.state.cpf}</a>
               </span>
            </div>

            <div  className="row">
               <span> Cep : 
                 <a> {this.state.cep} </a>
               </span>
            </div>
            <div  className="row">
               <span> logradouro : 
                 <a> {this.state.logradouro}</a>
               </span>
            </div>
            <div  className="row">
               <span> bairro : 
                 <a> {this.state.complemento}</a>
               </span>
            </div>
            <div  className="row">
               <span> Cidade : 
                 <a> {this.state.localidade}</a>
               </span>
            </div>
            <div  className="row">
               <span> UF : 
                 <a> {this.state.uf}</a>
               </span>
            </div>
            <hr></hr>
            <div  className="row">
               <span> Telefones : 
               {this.state.tableTelefones.map( (fone, key) => {
                  return  <div key={key} className=" row"> 
                                <span> Tipo : 
                               <a> {fone.tipo}</a>
                               </span>
                               <span> numero : 
                               <a> {fone.numero}</a>
                               </span>
                          </div> 
                     
                 }) }
               </span>
            </div>
            <hr></hr>
            <div  className="row">
            <span> Emails : 
               {this.state.tableEmails.map( (email, key) => {
                  return  <div key={key} className=" row"> 
                               <span> Email  : 
                               <a> {email.nome}</a>
                               </span>
                          </div> 
                     
                 }) }
               </span>
            </div>
          </Dialog>

        </div>

      </div>


    )
  }


}
Home.contextType = AuthContext;

export default withRouter(Home);