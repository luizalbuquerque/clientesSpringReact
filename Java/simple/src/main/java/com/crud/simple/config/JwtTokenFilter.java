package com.crud.simple.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.crud.simple.service.JwtService;
import com.crud.simple.service.UserDetailService;

public class JwtTokenFilter  extends OncePerRequestFilter {
	
	private JwtService jwtService;
	private UserDetailService userDetailService;
	
	
	
	public JwtTokenFilter(JwtService jwtService,UserDetailService userDetailService) {
	  this.jwtService =  jwtService;
	  this.userDetailService = userDetailService;
	  
		
	}
	

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String authorization = request.getHeader("Authorization");
		if( authorization != null && authorization.startsWith("Bearer")) {
			String token  = authorization.split(" ")[1];
			boolean isTokenValido = jwtService.isTokenValido(token);
			if(isTokenValido) {
				 UserDetails usuarioAutenticado = 
						 userDetailService.loadUserByUsername(jwtService.obterUserNameUser(token));
				UsernamePasswordAuthenticationToken user = 
						new UsernamePasswordAuthenticationToken(usuarioAutenticado, null, usuarioAutenticado.getAuthorities());
				user.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(user);
				
			
				
			}
		}
		 filterChain.doFilter(request, response);
	}

}
