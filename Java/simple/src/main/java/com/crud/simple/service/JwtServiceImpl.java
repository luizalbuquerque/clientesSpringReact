package com.crud.simple.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.crud.simple.model.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtServiceImpl implements JwtService{
	
	@Value("${jwt.expiracao}")
	private String expiracao;
	@Value("${jwt.chave.assinatura}")
	private String chaveAssinatura;

	@Override
	public String gerarToken(Usuario usuario) {
		long exp  = Long.valueOf(expiracao);
		LocalDateTime dataHoraExpiracao = LocalDateTime.now().plusMinutes(exp);
		Instant instant = dataHoraExpiracao.atZone(ZoneId.systemDefault()).toInstant();
		Date data = Date.from(instant);
		String horaExpiracao = dataHoraExpiracao.toLocalTime()
				.format(DateTimeFormatter.ofPattern("HH:mm"));
		String  token  = Jwts
				.builder().setExpiration(data)
				.setSubject(usuario.getUsername())
				.claim("id", usuario.getId())
				.claim("userName", usuario.getUsername())	
				.claim("horaExpiracao", horaExpiracao)
				.signWith(SignatureAlgorithm.HS512, chaveAssinatura)
				.compact();
		// TODO Auto-generated method stub
		return token;
	}

	@Override
	public Claims obterClaims(String token) throws ExpiredJwtException {
		// TODO Auto-generated method stub
		return Jwts.parser()
				.setSigningKey(chaveAssinatura)
				.parseClaimsJws(token)
				.getBody();
	}

	@Override
	public String obterUserNameUser(String token) {
		// TODO Auto-generated method stub
		Claims claims = obterClaims(token);
		return claims.getSubject();
		
		
	}

	@Override
	public boolean isTokenValido(String token) {
		try {
			Claims claims = obterClaims(token);
			 Date expiracao =claims.getExpiration();
			 
			 LocalDateTime dataExpiracao = expiracao.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
			 boolean dataHoraAtualIsAfterExpiracao = LocalDateTime.now().isAfter(dataExpiracao);
			return !dataHoraAtualIsAfterExpiracao;
			
		}catch (ExpiredJwtException e) {
			// TODO: handle exception
			return false;
		}
	}


}
