package com.crud.simple.service;



import java.util.List;

import javax.validation.ConstraintViolationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.crud.simple.model.Cliente;
import com.crud.simple.repository.ClienteRepository;
import com.crud.simple.service.exceptions.EntityNotFoundException;
import com.crud.simple.service.exceptions.ErroBeanValidation;

@Service
public class ClienteService {
	
	@Autowired
	ClienteRepository repository;
	
	public Cliente findById(long id) {
		return  repository.findById(id).orElseThrow(
				( ) -> new EntityNotFoundException("cliente nao encontrado "+id)
				);
	}
	
	public void delete(long id) {
		try{
			repository.deleteById(id);
		}catch(EmptyResultDataAccessException e) {
			throw new  EntityNotFoundException("cliente nao encontrado "+id);
		}
		
	}
	
	
  public Cliente cadastrar(Cliente cliente) {
          try {
        		for (int i = 0; i < cliente.getTelefones().size(); i++) {
    				cliente.getTelefones().get(i).setCliente(cliente);
    			}

    			for (int i = 0; i < cliente.getEmails().size(); i++) {
    				cliente.getEmails().get(i).setCliente(cliente);
    			}
    			Cliente c = repository.save(cliente);  
    			return c;
          }catch (ConstraintViolationException e) {
			throw new  ErroBeanValidation(e.getMessage());
  		}
		}
		  
		
  
  public Cliente atualizar(Cliente cliente) {
	   try {
			for (int i = 0; i < cliente.getTelefones().size(); i++) {
				cliente.getTelefones().get(i).setCliente(cliente);
			}

			for (int i = 0; i < cliente.getEmails().size(); i++) {
				cliente.getEmails().get(i).setCliente(cliente);
			}
			Cliente c = repository.save(cliente);  
			return c;
     }catch (ConstraintViolationException e) {
    	 throw new  ErroBeanValidation(e.getMessage());	
     }
		
	
  }
  
 public List<Cliente>  listar(){
		List<Cliente> listUsuarios = (List<Cliente>) repository.findAll();
		return listUsuarios;
	  
 }
 
}
