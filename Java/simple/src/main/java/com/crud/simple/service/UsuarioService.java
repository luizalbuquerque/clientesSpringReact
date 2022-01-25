package com.crud.simple.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crud.simple.model.Cliente;
import com.crud.simple.model.Usuario;
import com.crud.simple.repository.ClienteRepository;
import com.crud.simple.repository.UsuarioRepository;
import com.crud.simple.service.exceptions.EntityNotFoundException;
import com.crud.simple.service.exceptions.ErroAutenticacao;

@Service
public class UsuarioService {
	
  @Autowired
  UsuarioRepository repository;
  
  public  Usuario autenticar(String userName, String password) {
	  Optional<Usuario> usuario = repository.findByUsername(userName);  
	  if(!usuario.isPresent()) {
		  throw new ErroAutenticacao("usuario não encontrado!");
	  }
	  if(!usuario.get().getPassword().equals(password)) {
		  throw new ErroAutenticacao("Senha invalida");
	  }
	return usuario.get();
}
 
	
	public Usuario findById(long id) {
		return  repository.findById(id).orElseThrow(
				( ) -> new EntityNotFoundException("Usuario nao encontrado "+id)
				);
	}
	

}
