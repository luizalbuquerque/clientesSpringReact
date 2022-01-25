package com.crud.simple.service;

import javax.persistence.EntityNotFoundException;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service(value = "userDetailService")
public class UserDetailService implements UserDetailsService{

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String senhaCodificada = encoder.encode("123456");
		if(username.equalsIgnoreCase("User".trim())) {
		   return  User.withUsername(username).password(senhaCodificada).roles("USER").build();
			
		}else if(username.equalsIgnoreCase("ADMIN".trim())){
			 return  User.withUsername(username).password(senhaCodificada).roles("USER", "ADMIN").build();
				
		}
		
		throw new EntityNotFoundException("Usuario nao encontrado!");
	}
	
	

}
