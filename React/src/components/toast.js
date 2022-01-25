import toastr from "toastr"

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  export function mostrarMensagem(tipo, msg,titulo){
     toastr[tipo](msg, titulo)

  }

  export function mostrarMensagemErro( msg){
    toastr["error"](msg, "Erro")

 }

 export function mostrarMensagemSucesso( msg){
    toastr["success"](msg, "Sucesso")

 }
 export function mostrarMensagemAlerta(msg){
    toastr["warning"](msg, "Alerta")

 }