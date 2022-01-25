package com.crud.simple.service;

import com.crud.simple.model.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;

public interface JwtService {

	 String gerarToken(Usuario usuario);
	 
	 Claims obterClaims(String token )  throws ExpiredJwtException;
	 
	 String obterUserNameUser(String token ) ;
	  
	 boolean  isTokenValido(String token);
	

}
