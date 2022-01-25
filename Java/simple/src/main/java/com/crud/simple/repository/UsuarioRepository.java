package com.crud.simple.repository;

import java.util.Optional;


import org.springframework.data.repository.CrudRepository;

import com.crud.simple.model.Usuario;


public interface UsuarioRepository  extends CrudRepository<Usuario, Long> {
	
    Optional<Usuario> findByUsername(String userName);
    
      

}
