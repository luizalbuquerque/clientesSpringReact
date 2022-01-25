package com.crud.simple.model;

import java.io.Serializable;
import java.util.Objects;

public class TokenModel implements Serializable {
	
	private static final long serialVersionUID = 1L;
	private String name ;
	private String token;
	
	
	public TokenModel() {
		super();
	}
	public TokenModel(String name, String token) {
		super();
		this.name = name;
		this.token = token;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	@Override
	public int hashCode() {
		return Objects.hash(name, token);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		TokenModel other = (TokenModel) obj;
		return Objects.equals(name, other.name) && Objects.equals(token, other.token);
	}
	

}
