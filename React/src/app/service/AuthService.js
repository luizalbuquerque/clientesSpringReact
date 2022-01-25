
export const USUARIO_LOGADO = "_usuario_logado";

export default class AuthService{

    static  isUsuarioAutenticado(){
       const usuario  = JSON.parse(localStorage.getItem(USUARIO_LOGADO));
       return usuario && usuario.id;
    }

   static  removerUsuarioAutenticado(){
        localStorage.removeItem(USUARIO_LOGADO);
    }

   static logar(usuario){
      localStorage.setItem(USUARIO_LOGADO,JSON.stringify( usuario) )
    }
   
   static  obterUsuarioAutentcado(){
      return  JSON.parse(localStorage.getItem(USUARIO_LOGADO));
    }
}