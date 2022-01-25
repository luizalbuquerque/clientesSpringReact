import React from "react";
import Card from "../components/Card";
import FormFroup from "../components/form-group";
import axios from "axios";
import SelectMenu from "../components/SelectMenu";
import { withRouter } from "react-router-dom";
import TabelaTelefones from "../components/Tabletefones";
import TabelaEmails from "../components/TableEmails";
import  AuthContext from "../context/context"
import { CpfInput,TelefoneIpunt, CelularInput } from "../components/inputMask"
import { mostrarMensagemAlerta, mostrarMensagemSucesso, mostrarMensagemErro } from "../components/toast"
import{Validation} from "../app/util"


class CadastroCliente extends React.Component {
   state = {
      nome: "",
      cpf: "",
      cep: "",
      logradouro: "",
      complemento: "",
      bairro: "",
      localidade: "",
      uf: "",
      telefone: "",
      celular: "",
      email: "",
      tipotelefone: "",
      tableTelefones: [],
      tableEmails: [],
      idTelefone: -1,
      idEmail: 0,
      idCliente: "",
      atualizarC: false,
      idTesteTelefobe:"j"




   }

   componentDidMount() {
      const id = this.props.match.params.id;
      if (id) {
         this.setState({ atualizarC: true })
         axios.get(`http://localhost:8080/cliente/${id}`, { headers: {"Authorization" : `Bearer ${this.context.token}`} }).then(resposta => {
            const { cep, logradouro, complemento, bairro, localidade, uf } = resposta.data.endereco;
            this.setState({ cep, logradouro, complemento, bairro, localidade, uf })
            this.setState({ tableEmails: resposta.data.emails, tableTelefones: resposta.data.telefones, idCliente: id })
            this.setState({ nome: resposta.data.nome, cpf: resposta.data.cpf })
         }).catch(erro => {
            console.log(erro.resposta)
            this.setState({ msg: erro.resposta.data })
            alert("Falha ao buscar usuario", erro.resposta.data)

         })
      }
   }

   deletarTelefone = (telefone) => {
      const table = this.state.tableTelefones
      const index = table.indexOf(telefone)
      table.splice(index, 1)
      this.setState({ tableTelefones: table })

   }

   validar() {
      let msg = [];
      if (!this.state.nome) {
         msg.push("Campo nome obrigatório")
      } else if (!new RegExp(/^[a-z0-9A-Z ]+[a-z0-9A-Z ]{1,}$/).test(this.state.nome)) {
         msg.push("permite apenas letras espaços e números")
      } else if (this.state.nome.length < 3 || this.state.nome.length > 100) {
         msg.push("campo precisar estar entre 3 a 100 carcteres!")
      }else if (!Validation.ValidarCPF(this.state.cpf.replace(/[^0-9]/g, ""))){
         msg.push("Cpf Inválido")
      }
      if (!this.state.cpf) {
         msg.push("campo cpf nao pode estar vazio")
      }
      if (!this.state.cep.length >= 9 ) {
         msg.push("Campo cep esntar incorrero")
      }

      if (!this.state.logradouro) {
         msg.push("Campo logradouro obrigatório")
      }
      if (!this.state.bairro) {
         msg.push("Campo Bairro obrigatório")
      }
      if (!this.state.localidade) {
         msg.push("Campo Bairro obrigatório")
      }
      if (!this.state.uf) {
         msg.push("Campo uf obrigatório")
      }
       if(this.state.tableTelefones <1){
          msg.push("Você precisa cadastar pelo menos um telefone!")
       }
       if(this.state.tableEmails <1){
         msg.push("Você precisa cadastar pelo menos um email!")
      }
     
      return msg;
   }

   cadastrar = () => {
      const msgs = this.validar();
      if (msgs && msgs.length > 0) {
         msgs.forEach((msg) => {
            mostrarMensagemAlerta(msg)
         });
         return false;
      }
      const enderecoString = JSON.stringify({
         cep: this.state.cep, logradouro: this.state.logradouro,
         complemento: this.state.complemento,
         bairro: this.state.bairro, localidade: this.state.localidade, uf: this.state.uf
      })
      const resultadoTelefone = this.state.tableTelefones.map(function (elemento) {
         let { numero, tipo } = elemento;
         const telefoneNovo = { numero, tipo }
         return telefoneNovo;
      })

      const resultadoEmail = this.state.tableEmails.map(function (elemento) {
         let { nome } = elemento;
         const emailNovo = { nome }
         return emailNovo;
      })

      const data = {
         nome: this.state.nome,
         cpf: this.state.cpf.replace(/[^0-9]/g, ""),
         telefones: resultadoTelefone,
         endereco: JSON.parse(enderecoString),
         emails: resultadoEmail
      }
      axios.post(`http://localhost:8080/cliente/`, data, 
      { headers:  {"Authorization" : `Bearer ${this.context.token}`,
      'Accept' : 'application/json',
      'Content-Type': 'application/json'  
      }}).then(resposta => {
         console.log(resposta)
         mostrarMensagemSucesso("Salvo com sucesso!")
         this.props.history.push(`/home/`)
      }).catch(erro => {  
          mostrarMensagemErro(erro.response.data.erro)
      })
   }
   atualizar = () => {

      const msgs = this.validar();
      if (msgs && msgs.length > 0) {
         msgs.forEach((msg) => {
            mostrarMensagemAlerta(msg)
         });
         return false;
      }
      const idCli = this.state.idCliente
      const enderecoString = JSON.stringify({
         cep: this.state.cep, logradouro: this.state.logradouro,
         complemento: this.state.complemento,
         bairro: this.state.bairro, localidade: this.state.localidade, uf: this.state.uf
      })

      const resultadoTelefone = this.state.tableTelefones.map(function (elemento) {
         let { id, numero, tipo } = elemento;
         const telefoneNovo = { id, numero, tipo }
         return telefoneNovo;
      })

      const resultadoEmail = this.state.tableEmails.map(function (elemento) {
         let { id, nome } = elemento;
         const emailNovo = { id, nome }
         return emailNovo;
      })

      const data = {
         id: idCli,
         nome: this.state.nome,
         cpf: this.state.cpf.replace(/[^0-9]/g, ""),
         telefones: resultadoTelefone,
         endereco: JSON.parse(enderecoString),
         emails: resultadoEmail

      }
      axios.put(`http://localhost:8080/cliente/`, data, 
       { headers:  {"Authorization" : `Bearer ${this.context.token}`,
       'Accept' : 'application/json',
       'Content-Type': 'application/json'  
      } } ).then(resposta => {
         mostrarMensagemSucesso("Atualizado com sucesso!")
         this.props.history.push(`/home/`)
      }).catch((erro) => {
         mostrarMensagemErro(erro.response.data.erro)
      });


   }

   addEmail = () => {
      if(!this.state.email){
         mostrarMensagemAlerta("Email precisa ser adicionado!")
         return false;
      }else if (!new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/ ).test(this.state.email)){
         mostrarMensagemAlerta("Email não e válido !")
         return false;
      }

      const tabelaEmailss = this.state.tableEmails;
      let contaEmail = this.state.idEmail += 1
      const emailss = { id: contaEmail, nome: this.state.email }
      this.setState({ contaEmail: contaEmail })
      tabelaEmailss.push(emailss)
      this.setState({ tableEmails: tabelaEmailss })

   }

   buscarCep = () => {
      const { cep } = this.state
      axios.get(` https://viacep.com.br/ws/${cep}/json/`).then((respposta) => {
         const { cep, logradouro, complemento, bairro, localidade, uf } = respposta.data;
         this.setState({ cep, logradouro, complemento, bairro, localidade, uf })
         console.log(" dados", localidade)
      }).catch(function () {
         alert("cep não encontrado")
      }

      )


      //   this.setState(cep, logradouro,complemento, bairro,localidade, uf )

   }

   deletarEmail = (email) => {
      let tableEm = this.state.tableEmails
      let index = tableEm.indexOf(email)
      tableEm.splice(index, 1)
      this.setState({ tableEmails: tableEm })
   }

   addtelefone = () => {
      if(!this.state.tipotelefone){
         mostrarMensagemAlerta("Você precisa selecionar o tipo de telefone")
         return false;
      }else  if(!this.state.telefone){
         mostrarMensagemAlerta("Você precisa adicionar o número")
         return false;
      }  
      const tabela = this.state.tableTelefones
      let contador = this.state.idTelefone += 1
      const tel = { id: contador, numero: this.state.telefone.replace(/[^0-9]/g,""), tipo: this.state.tipotelefone }
      this.setState({ conatdor: contador })
      tabela.push(tel)
      this.setState({ tableTelefones: tabela })
   }
   render() {


      console.log("render do cadstro")

      const listaEstados = [
         { label: 'Selecione o estado', value: '' },
         { label: 'Acre', value: 'AC' },
         { label: 'Amapá', value: 'AP' },
         { label: 'Amazonas', value: 'AM' },
         { label: 'Bahia', value: 'BA' },
         { label: 'Ceará', value: 'CE' },
         { label: "Distrito Federal", value: 'DF' },
         { label: 'Espirito Santos', value: 'ES' },
         { label: 'Goiás', value: 'GO' },

         { label: 'Maranhão', value: 'MA' },
         { label: 'Mato Grosso', value: 'MT' },
         { label: 'Mato Grosso do Sul', value: 'MS' },
         { label: 'Minas Gerais', value: 'MG' },
         { label: 'Pará', value: 'PA' },
         { label: "Paraíba", value: 'PB' },
         { label: 'Paraná', value: 'PR' },
         { label: 'Pernanbuco', value: 'PE' },

         { label: 'Piauí', value: 'PI' },
         { label: 'Rio de Janeiro', value: 'RJ' },
         { label: 'Rio Grande do Norte', value: 'RN' },
         { label: 'Rio Grande do Sul', value: 'RS' },
         { label: 'Rodônia', value: 'RO' },
         { label: "Roaríma", value: 'RR' },
         { label: 'Santa Catarina', value: 'SC' },
         { label: 'São Paulo', value: 'Sp' },

         { label: 'Sergipe', value: 'SE' },
         { label: 'Tocantis', value: 'TO' }

      ]


      const listatipostelefones = [
         { label: 'Selecione o tipo', value: '' },
         { label: 'Celular', value: 'Celular' },
         { label: 'Residencial', value: 'Residencial' },
         { label: 'Comercial', value: 'Comercial' }
      ]

   //   console.log( "quantidade de teelfonbes",this.tableTelefones.length)
      return (
         <Card title="Cadastro de Clientes" >
            <div className="row">
               <div className="col-md-12">
                  <FormFroup label="Nome: *" htmlFor="inputNome">
                     <input type="text" id="inputNome" name="nome"
                        value={this.state.nome}
                        className="form-control"
                        onChange={e => this.setState({ nome: e.target.value })} />
                  </FormFroup>
               </div>
            </div>
            <div className="row">


               <div className="col-md-6">
                  <CpfInput label={"CPF: *"} value={this.state.cpf} onChange={(e) => { this.setState({cpf:e.target.value})}} >
                  </CpfInput>
               </div>

               <div className=" row">

                  <div className="col-md-6">
                     <FormFroup label="CEP: *" htmlFor="inputCep">
                        <input type="number" id="inputCep" name="cep"
                           className="form-control"
                           value={this.state.cep}
                           onChange={e => this.setState({ cep: e.target.value })} />
                     </FormFroup>

                  </div>


                  <div className="col-md-4">
                     <br></br>
                     <button onClick={this.buscarCep} type="button" className="btn btn-success">buscar cep</button>


                  </div>

                  <div className="col-lg-12">

                     <FormFroup label="Logradouro: *" htmlFor="inputLogradouro">
                        <input type="text" id="inputLogradouro" name="logradouro"
                           className="form-control"
                           value={this.state.logradouro}
                           onChange={e => this.setState({ logradouro: e.target.value })} />
                     </FormFroup>


                  </div>

                  <div className="col-lg-6">
                     <FormFroup label="Complemento: *" htmlFor="inputComplemento">
                        <input type="text" id="inputComplemento" name="complemento"
                           className="form-control"
                           value={this.state.complemento}
                           onChange={e => this.setState({ complemento: e.target.value })} />
                     </FormFroup>


                  </div>
                  <div className="col-lg-6">

                     <FormFroup label="Bairro: *" htmlFor="inputBairro">
                        <input type="text" id="inputBairro" name="bairro"
                           className="form-control"
                           value={this.state.bairro}
                           onChange={e => this.setState({ bairro: e.target.value })} />
                     </FormFroup>


                  </div>


               </div>
               <div className="row">
                  <div className="col-md-8">
                     <FormFroup label="Cidade: *" htmlFor="localidade">
                        <input type="text" id="inputLocalidade" name="localidade"
                           className="form-control"
                           value={this.state.localidade}
                           onChange={e => this.setState({ localidade: e.target.value })} />
                     </FormFroup>

                  </div>
                  <div className="col-md-4">
                     <FormFroup label="UF: *" htmlFor="inputUf">
                        <SelectMenu value={this.state.uf} onChange={e => this.setState({ uf: e.target.value })} className="form-control" lista={listaEstados}>

                        </SelectMenu>

                     </FormFroup>


                  </div>

               </div>
               <br />

               <div className="row">
                  <h5>  Cadastro de telefones : </h5>
                  <div className="col-md-3">
                     <FormFroup label="Tipo de telefone: *" htmlFor="inputtelefone">
                        <SelectMenu value={this.state.tipotelefone} onChange={e => this.setState({ tipotelefone: e.target.value })} className="form-control" lista={listatipostelefones}>
                        </SelectMenu>
                     </FormFroup>


                  </div>

                  <div className="col-md-4">
                     {this.state.tipotelefone ==="Residencial" &&
                        <TelefoneIpunt label={"Telefone Residencial: *"} value={this.state.telefone} onChange={(e) => { this.setState({ telefone: e.target.value })}}/ >
                     }
                     {this.state.tipotelefone ==="Comercial" &&
                        <TelefoneIpunt label={"Telefone Comercial: *"} value={this.state.telefone} onChange={(e) => { this.setState({ telefone: e.target.value })}}/ >
                     }
                     {this.state.tipotelefone ==="Celular" &&
                        <CelularInput label={"Telefone celular: *"} value={this.state.telefone} onChange={(e) => { this.setState({ telefone: e.target.value })}}/ >
                     }
                  </div>

                  <div className="col-md-4">
                     <br></br>
                     <button onClick={this.addtelefone} type="button" className="btn btn-success">Add Telefone</button>


                  </div>

               </div>
            </div>

            <div className="row">
               <div className="col-md-6">
                  <TabelaTelefones telefones={this.state.tableTelefones} deletarTelAction={this.deletarTelefone} />
               </div>

            </div>


            <div className="row">
               <h5>  Cadastro de emails</h5>
               <div className="col-md-4">
                  <FormFroup label="Email: *" htmlFor="inputEmail">
                     <input type="email" id="inputEmail" name="email"
                        className="form-control"
                        onChange={e => this.setState({ email: e.target.value })} />
                  </FormFroup>
               </div>
               <div className="col-md-4">
                  <br />
                  <button onClick={this.addEmail} type="button" className="btn btn-success">Add Email</button>
               </div>
            </div>

            <div className="row">
               <div className="col-md-6">
                  <TabelaEmails emails={this.state.tableEmails} deletarAction={this.deletarEmail} />
               </div>

            </div>

            <br />
            {!this.state.atualizarC ? (<button onClick={this.cadastrar} type="button" className="btn btn-success">salvar cliente</button>
            ) : (<button onClick={this.atualizar} type="button" className="btn btn-success">atualizar cliente</button>)}



         </Card>


      )
   }


}
CadastroCliente.contextType = AuthContext;

export default withRouter(CadastroCliente);