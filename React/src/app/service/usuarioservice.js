import ApiService from "../apiservice"

class UsuarioService   extends ApiService{
    constructor(){
      super("usuario")
    }

    autenticar(dados){
        return this.post("/autenticar/",dados );
    }
}

export default UsuarioService;