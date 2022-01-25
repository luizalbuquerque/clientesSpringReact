package com.crud.simple.resource.exceptions;

import java.time.Instant;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.crud.simple.service.exceptions.EntityNotFoundException;
import com.crud.simple.service.exceptions.ErroBeanValidation;

@ControllerAdvice
public class ResourceExeptionHandler {

	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<StandardError> entityNotFound(EntityNotFoundException e, HttpServletRequest request){
		// TODO: handle exception
		 StandardError err= new StandardError();
		 err.setTimestamp(Instant.now());
		 err.setStatus(HttpStatus.NOT_FOUND.value());
		 err.setMsg(e.getMessage()); 
		 err.setTrace("erro ao buscar objeto"+ request.getRequestURI());
		 return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
	}
	

	@ExceptionHandler(ErroBeanValidation.class)
	public ResponseEntity<StandardError> entityNotFound(ErroBeanValidation e, HttpServletRequest request){
		// TODO: handle exception
		 StandardError err= new StandardError();
		 err.setTimestamp(Instant.now());
		 err.setStatus(HttpStatus.NOT_FOUND.value());
		// err.setMsg(e.getMessage().split("]")[2].split("}")[0].split("messageTemplate=")[1]);
	    err.setMsg(e.getMessage().split("]")[2].split("}")[0]
				  .split("interpolatedMessage=")[1].split(",")[0]); 
		 err.setTrace("erro ao cadastrar objeto"+ request.getRequestURI());
		 return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
	}
	
	/**@ExceptionHandler({AccessDeniedException.class})
	public ResponseEntity acessoNegado() {
		return  ResponseEntity.status(HttpStatus.FORBIDDEN).body(new Error("Acesso Negado!"));
	}   */
}
 class Error{
	
	public String error;
	
	public Error(String error) {
		this.error = error;
	}
}
