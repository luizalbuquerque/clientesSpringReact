package com.crud.simple.config;


import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.crud.simple.service.JwtService;
import com.crud.simple.service.UserDetailService;


@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig   extends WebSecurityConfigurerAdapter {
	
	@Autowired
	@Qualifier("userDetailService")
	private UserDetailService userDetailService;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AccesDaniedHandler accesDaniedHandler;
	
	@Bean
	public JwtTokenFilter jwtTokenFilter() {
		return new JwtTokenFilter(jwtService, userDetailService);
	};
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	  BCryptPasswordEncoder  enconder = new BCryptPasswordEncoder();
	  auth.userDetailsService(userDetailService).passwordEncoder(enconder);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// TODO Auto-generated method stub
	     http.csrf().disable()
	           .authorizeRequests()
	           .antMatchers("/usuario/**").permitAll()
	           .anyRequest()      
	           .authenticated() 
		       .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		       .and()
		      .addFilterBefore(jwtTokenFilter(), UsernamePasswordAuthenticationFilter.class)
		      .exceptionHandling()
		      .accessDeniedHandler(accesDaniedHandler);
	    //  .httpBasic();
	      
		
	       
	}
	
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilter(){
		
		List<String> all  = Arrays.asList("*");
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedMethods(all);
		//config.setAllowedOrigins(all);
		config.setAllowedOriginPatterns(all);
		config.setAllowedHeaders(all);
		config.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		
		CorsFilter corsfilter = new CorsFilter(source);
		FilterRegistrationBean<CorsFilter> filter = new FilterRegistrationBean<CorsFilter>(corsfilter);
		filter.setOrder(Ordered.HIGHEST_PRECEDENCE);
		
		return filter;
		
	}   
	
	
}
