package com.crud.simple.controller;




import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.crud.simple.model.Cliente;
import com.crud.simple.model.TokenModel;
import com.crud.simple.model.Usuario;
import com.crud.simple.repository.UsuarioRepository;
import com.crud.simple.service.JwtService;
import com.crud.simple.service.UsuarioService;
import com.crud.simple.service.exceptions.ErroAutenticacao;


@RestController
@RequestMapping(value = "/usuario")
public class UsuarioController {
	
	@Autowired
	UsuarioRepository usuarioRepository;
	
	@Autowired
	UsuarioService service;
	
	@Autowired
	private JwtService jwtService;

	@PostMapping(value = "/",produces = "application/json")
	public ResponseEntity<Usuario> cadastrar(@RequestBody Usuario usuario) {	
         Usuario usuarioSalvo = usuarioRepository.save(usuario);
		return new ResponseEntity<Usuario>(usuarioSalvo, HttpStatus.OK);
		//return  ResponseEntity.ok(u);
	}   
	
	
	@GetMapping(value = "/",produces = "application/json")
	public ResponseEntity<List<Usuario>> listarUsuarios() {
         
         List<Usuario>  lisUsuarios = (List<Usuario>)usuarioRepository.findAll();
            
		return new ResponseEntity<List<Usuario>>(lisUsuarios, HttpStatus.OK);
		//return  ResponseEntity.ok(u);
	}
	
	
	@PostMapping(value = "/autenticar",produces = "application/json")
	public   ResponseEntity<?>  autenticar(@RequestBody Usuario usuario) {
	 try {
			
			 Usuario userAutenticado = service.autenticar(usuario.getUsername(), usuario.getPassword());
		    String token = jwtService.gerarToken(userAutenticado);
			TokenModel model = new  TokenModel(usuario.getUsername(), token) ;
			return  ResponseEntity.ok(model);
			
		}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return  ResponseEntity.badRequest().body(e.getMessage());
			
		}
     
		
	}   
	
	
	 @ResponseStatus(HttpStatus.BAD_REQUEST)
	 @ExceptionHandler(MethodArgumentNotValidException.class)
	 public Map<String, String> handleValidationExceptions(
	   MethodArgumentNotValidException ex) {
	     Map<String, String> errors = new HashMap<>();
	     ex.getBindingResult().getAllErrors().forEach((error) -> {
	         String fieldName = ((FieldError) error).getField();
	         String errorMessage = error.getDefaultMessage();
	         errors.put(fieldName, errorMessage);
	     });
	     return errors;
	 }
	   @GetMapping(value = "/{id}", produces =  "application/json")
	  @ResponseStatus(HttpStatus.OK)
	 public ResponseEntity<Usuario> buscarPorId(@PathVariable(value = "id") Long id) {	 
	 Usuario c = service.findById(id);
        return  ResponseEntity.ok().body(c);
		
	 }
}
