package com.crud.simple.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import com.crud.simple.util.ServletUtil;

@Component
public class AccesDaniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		
		// TODO Auto-generated method stub
		Authentication authh = SecurityContextHolder.getContext().getAuthentication();
		if(authh != null) {
			String json  =ServletUtil.getJson("erro", "Acesso negado");
			ServletUtil.write(response, HttpStatus.FORBIDDEN ,json);
		}
		
	}

}
