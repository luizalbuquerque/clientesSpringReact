package com.crud.simple.controller;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.crud.simple.model.Cliente;
import com.crud.simple.repository.ClienteRepository;
import com.crud.simple.service.ClienteService;


@RestController
@RequestMapping(value = "/cliente")
public class ClienteController {

	@Autowired
	ClienteService service;

	@Secured("ROLE_ADMIN")
	@PostMapping(value = "/", produces = "application/json")
	public ResponseEntity<Cliente> cadastrar(@RequestBody @Valid  Cliente cliente) {
	     Cliente clienteCadastrado = service.cadastrar(cliente);
		return new ResponseEntity<Cliente>(clienteCadastrado, HttpStatus.CREATED);
	}


	@GetMapping(value = "/", produces = "application/json")
	public ResponseEntity<List<Cliente>> listarUsuarios() {         
	return new ResponseEntity<List<Cliente>>( service.listar(), HttpStatus.OK);
	}

	@Secured("ROLE_ADMIN")
	@PutMapping(value = "/", produces = "application/json")
	public ResponseEntity<Cliente> atualizar(@Valid @RequestBody Cliente cliente) {
		Cliente clienteAtualizado = service.atualizar(cliente);
		return new ResponseEntity<Cliente>(clienteAtualizado, HttpStatus.CREATED);
	
	}

	@Secured("ROLE_ADMIN")
	@DeleteMapping(value = "/{id}", produces = "application/text")
	public String delete(@PathVariable(value = "id") Long id) {
	    service.delete(id);
		return "Deletado com sucesso"; // return ResponseEntity.ok(u);
	}


	@GetMapping(value = "/{id}", produces = "application/json")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Cliente> buscarPorId(@PathVariable(value = "id") Long id) {
		Cliente c = service.findById(id);
		return ResponseEntity.ok().body(c);

	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		return errors;
	}   

}
