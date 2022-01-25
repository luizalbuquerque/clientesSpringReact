
import ApiService from "../apiservice";
class ClienteService extends ApiService{
 constructor(){
     super("cliente")
 }
 cadastrar(data){
      return this.post("/", data)
 }

}